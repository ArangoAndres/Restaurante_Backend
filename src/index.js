import dotenv from "dotenv";
import app from "./app.js";
import { connectRedis } from "./config/redis.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectRedis();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Servidor en puerto ${PORT}`);
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM recibido");
      server.close(() => {
        console.log("Servidor cerrado");
        process.exit(0);
      });
    });

  } catch (error) {
    console.error("Error iniciando servidor:", error);
    process.exit(1);
  }
};

start();