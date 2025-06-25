import authRoutes from "./routes/auth.route.js";
import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.express(json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
