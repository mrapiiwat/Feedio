import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

// Import swagger
import { setupSwagger } from "./config/swagger";

// Import routes
import dogRoutes from "./routes/dog.route";
import recommendationRoutes from "./routes/recommendation.route";
import feederRoutes from "./routes/feeder.route";
import scheduleRoutes from "./routes/schedule.routes";
import notificationRoutes from "./routes/notification.route";
import weightSensorRoutes from "./routes/wrightSensor.route";
import historyRoutes from "./routes/history.route";

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

setupSwagger(app); // Initialize Swagger documentation
// Limit requests per IP
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: "Too many requests, please try again later.",
});

app.use(limiter); // Apply rate limiting to all requests

app.get("/api/version", (req, res) => {
  res.json({ version: "1.0.0" });
});

//Routes
app.use("/api", dogRoutes);
app.use("/api", recommendationRoutes);
app.use("/api", feederRoutes);
app.use("/api", scheduleRoutes);
app.use("/api", notificationRoutes);
app.use("/api", weightSensorRoutes);
app.use("/api", historyRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
