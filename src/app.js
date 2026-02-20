import express from "express";
import redisRoutes from "./routes/redis.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/redis", redisRoutes);

export default app;