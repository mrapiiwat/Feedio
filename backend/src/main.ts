import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import dogRoutes from "./routes/dog.route";

const app = express();
app.use(cors());
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;

app.use("/api", dogRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
