import { createClient } from "redis";

const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || undefined;

const client = createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
  password: REDIS_PASSWORD,
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

export const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
    console.log("Redis conectado");
  }
};

export default client;