import express from "express";
import redisRoutes from "./routes/redis.routes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

app.use(express.json());
app.use("/api/redis", redisRoutes);

export default app;