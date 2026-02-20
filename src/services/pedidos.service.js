import client from "../config/redis.js";

// Generar key dinámica por fecha
const getTodayKey = () => {
  const today = new Date().toISOString().split("T")[0];
  return `pedidos:${today}`;
};

// Configurar expiración a las 10pm
const setExpirationIfNeeded = async (key) => {
  const ttl = await client.ttl(key);

  // Si no tiene expiración
  if (ttl === -1) {
    const now = new Date();
    const expireAt = new Date();

    expireAt.setHours(22, 0, 0, 0); // 10:00 PM

    // Si ya pasaron las 10pm hoy, que expire mañana
    if (now > expireAt) {
      expireAt.setDate(expireAt.getDate() + 1);
    }

    await client.expireAt(key, Math.floor(expireAt.getTime() / 1000));
  }
};

// Guardar pedido
export const savePedido = async (pedido) => {
  const key = getTodayKey();

  await client.rPush(key, JSON.stringify(pedido));

  await setExpirationIfNeeded(key);
};

// Obtener pedidos del día
export const getPedidos = async () => {
  const key = getTodayKey();
  const pedidos = await client.lRange(key, 0, -1);
  return pedidos.map(p => JSON.parse(p));
};

// Eliminar pedidos manualmente
export const deletePedidos = async () => {
  const key = getTodayKey();
  await client.del(key);
};