import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
