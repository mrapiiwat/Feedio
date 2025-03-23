import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// Import swagger
import { setupSwagger } from "./config/swagger";

// Import routes
import dogRoutes from "./routes/dog.route";
import recommendationRoutes from "./routes/recommendation.route";
import feederRoutes from "./routes/feeder.route";

const app = express();
app.use(cors());
dotenv.config();
setupSwagger(app); // Initialize Swagger documentation
app.use(morgan("dev"));
app.use(express.json());
const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;

//Routes
app.use("/api", dogRoutes);
app.use("/api", recommendationRoutes);
app.use("/api", feederRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
