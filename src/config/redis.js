import { createClient } from "redis";
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = Number(process.env.REDIS_PORT);
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const client = createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
  username: process.env.REDIS_USERNAME,
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

