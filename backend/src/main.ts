import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import rateLimit from "express-rate-limit";
import fs from "fs";
import { spawn } from "child_process";
import cowsay from "cowsay";
import { WebSocketServer, WebSocket } from "ws";

// Import routes
import dogRoutes from "./routes/dog.route";
import recommendationRoutes from "./routes/recommendation.route";
import feederRoutes from "./routes/feeder.route";
import scheduleRoutes from "./routes/schedule.routes";
import notificationRoutes from "./routes/notification.route";
import weightSensorRoutes from "./routes/wrightSensor.route";
import historyRoutes from "./routes/history.route";

const app = express();

const predict: string[] = [];

// Create Uploads folder if not exists
const uploadDir = "./Uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
const rootDir = path.resolve(__dirname, "..");
app.use("/api/uploads", express.static(path.join(rootDir, "Uploads")));

// Setup Swagger
import { setupSwagger } from "./config/swagger";
setupSwagger(app);

setupSwagger(app); // Initialize Swagger documentation
// Limit requests per IP
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: "Too many requests, please try again later.",
});

// app.use(limiter); // Apply rate limiting to all requests

app.get("/api/version", (req: Request, res: Response) => {
  console.log(
    cowsay.say({
      text: "version 1.0.0",
    })
  );
  res.json({ message: "version 1.0.0" });
});

//Routes
app.use("/api", dogRoutes);
app.use("/api", recommendationRoutes);
app.use("/api", feederRoutes);
app.use("/api", scheduleRoutes);
app.use("/api", notificationRoutes);
app.use("/api", weightSensorRoutes);
app.use("/api", historyRoutes);

// Image upload + Python predict route
app.post("/upload", upload.single("image"), (req: Request, res: Response) => {
  if (!req.file) {
    console.log("No image uploaded or invalid format");
    res.status(400).send("No image uploaded");
    return;
  }

  const filename = req.file.filename;
  const filePath = path.join(uploadDir, filename);
  console.log(`Image saved as ${filename}, size: ${req.file.size} bytes`);

  const pythonProcess = spawn("python", ["../predict.py", filePath], {
    env: { ...process.env, PYTHONIOENCODING: "utf-8" },
  });

  let prediction = "";
  let errorOutput = "";

  pythonProcess.stdout.on("data", (data: Buffer) => {
    prediction += data.toString();
  });

  pythonProcess.stderr.on("data", (data: Buffer) => {
    const errorMessage = data.toString("utf8");
    if (!errorMessage.includes("Traceback")) {
      return;
    }
    errorOutput += errorMessage;
  });

  pythonProcess.on("close", (code: number) => {
    if (code === 0) {
      const pred = prediction.trim();
      console.log(`AI Prediction for ${filename}: ${pred}`);
      predict.push(pred);
      res.status(200).json({
        message: "Image saved",
        prediction: pred,
      });
    } else {
      console.error(`Python script error: ${errorOutput}`);
      res.status(500).send(`Error processing image: ${errorOutput}`);
    }
  });
});

// Root route (summary + uploaded predictions)
app.get("/api", (_req: Request, res: Response) => {
  res.json({
    message: "Server is running. Use /upload to upload an image.",
    predictions: predict,
  });
});

// WebSocket server
const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket server is running on port 8080");

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  ws.on("message", (message: string) => {
    try {
      const { status, value } = JSON.parse(message);

      const response = {
        message: "This is a message from the server",
        status: status,
        value: value,
      };

      ws.send(JSON.stringify(response));
    } catch (err) {
      console.log("error", err);
    }
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

export default app;
