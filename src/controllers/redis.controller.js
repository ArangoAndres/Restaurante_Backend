import client from "../config/redis.js";

export const testRedis = async (req, res) => {
  try {
    await client.set("mensaje", "hola redis", { EX: 60 });
    const value = await client.get("mensaje");

    res.json({ value });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Redis error" });
  }
};