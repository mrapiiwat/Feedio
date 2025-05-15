import app from "./main";
import dotenv from "dotenv";

// Config .env
dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const host = process.env.HOST || "0.0.0.0";

app.listen(port, host, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
