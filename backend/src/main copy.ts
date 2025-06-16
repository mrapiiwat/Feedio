import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import multer from "multer";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";
import cowsay from "cowsay";
import { WebSocketServer, WebSocket } from "ws";
// import http from "http";

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

// เก็บข้อมูลรูปภาพและเวลาล่าสุด
interface ImageData {
  path: string;
  timestamp: Date;
  prediction: string;
  lastSeen?: string; 
}

let latestImageData: ImageData | null = null;

// Create Uploads folder if not exists
const uploadDir = path.join(__dirname, "../Uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, 'temp.jpg');
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
app.post("/upload", upload.single("image"), async (req: Request, res: Response) => {

  if (!req.file) {
    console.log("No image uploaded or invalid format");
    res.status(400).send("No image uploaded");
    return; 
  }
  const filename = req.file.filename;
  const filePath = path.join(uploadDir, filename);
  console.log(`Image saved as ${filename}, size: ${req.file.size} bytes`);

  try {
    const { stdout, stderr } = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
      const pythonProcess = spawn("python", [path.join(__dirname, "predict.py"), filePath]);
      let stdout = "";
      let stderr = "";
  
      pythonProcess.stdout.on("data", (data) => {
        stdout += data.toString();
      });
  
      pythonProcess.stderr.on("data", (data) => {
        const errorMessage = data.toString("utf8");
        if (!errorMessage.includes("Traceback")) {
          return;
        }
        stderr += errorMessage;
      });
  
      pythonProcess.on("close", (code) => {
        if (code === 0) {
          resolve({ stdout, stderr });
        } else {
          reject(stderr);
        }
      });
    });
  
    const prediction = stdout.trim();
    console.log(`AI Prediction for ${filename}: ${prediction}`);
    predict.push(prediction);
    if (prediction.toLowerCase() === 'dogs') {
      const dogImagePath = path.join(uploadDir, 'dog.jpg');
      try {
        if (fs.existsSync(dogImagePath)) {
          fs.unlinkSync(dogImagePath);
        }
        fs.renameSync(filePath, dogImagePath);
        
        // เก็บข้อมูลรูปภาพล่าสุดและเวลา
        const timestamp = new Date();
        latestImageData = {
          path: '/uploads/dog.jpg',
          timestamp: timestamp,
          prediction: prediction,
          lastSeen: timestamp.toLocaleString()
        };
        console.log('Dog image saved:', latestImageData);
      } catch (err) {
        console.error('Error renaming file to dog.jpg:', err);
      }
    } else {
      console.log('Not a dog, removing uploaded image:', filePath);
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Error deleting non-dog image:', err);
      }
    }
    
    res.status(200).json({
      message: "Image saved",
      prediction: prediction,
    });
  } catch (error) {
    console.error(`Python script error: ${error}`);
    res.status(500).send(`Error processing image: ${error}`);
  }
});


app.get('/api/latest-image', (_req: Request, res: Response) => {
  console.log("Checking for latest dog image");
    console.log('Fetching latest image data... 222222222222');
  if (latestImageData) {
    console.log('Serving latest image data from memory:', latestImageData.path);
    res.json(latestImageData);
  } else {
    const dogImagePath = path.join(uploadDir, 'dog.jpg');
    if (fs.existsSync(dogImagePath)) {
      try {
        const stats = fs.statSync(dogImagePath);
        const lastModified = stats.mtime; // เวลาที่ไฟล์ถูกแก้ไขล่าสุด
        
        const imageData = {
          path: '/uploads/dog.jpg',
          timestamp: lastModified,
          prediction: 'dogs',
          lastSeen: lastModified.toLocaleString()
        };
        
        console.log('Serving latest image data from file system:', imageData.path, 'Last modified:', imageData.lastSeen);
        res.json(imageData);
        latestImageData = imageData;
      } catch (err) {
        console.error('Error reading dog.jpg file stats:', err);
        res.status(500).json({ message: 'Error reading dog image file' });
      }
    } else {
      console.log('No dog image file found in uploads directory');
      res.status(404).json({ message: 'ยังไม่เคยมีรูปหมา' });
    }
  }
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
