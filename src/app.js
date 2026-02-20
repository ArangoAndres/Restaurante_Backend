import express from "express";
import redisRoutes from "./routes/redis.routes.js";

const app = express();

app.use(express.json());

app.use("/api/redis", redisRoutes);

export default app;