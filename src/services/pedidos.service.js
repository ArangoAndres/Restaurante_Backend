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

  // Obtener cantidad actual de pedidos del día
  const totalPedidos = await client.lLen(key);

  const nuevoPedido = {
    id: totalPedidos + 1,
    fecha: new Date().toISOString(),
    ...pedido
  };

  await client.rPush(key, JSON.stringify(nuevoPedido));

  await setExpirationIfNeeded(key);

  return nuevoPedido;
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

// Actualizar un pedido dentro de la lista por su ID
export const updatePedidoEstado = async (id, nuevoEstado) => {
  const key = getTodayKey();
  const pedidos = await client.lRange(key, 0, -1);

  for (let i = 0; i < pedidos.length; i++) {
    const pedido = JSON.parse(pedidos[i]);

    if (Number(pedido.id) === Number(id)) {
      pedido.estado = nuevoEstado;
      await client.lSet(key, i, JSON.stringify(pedido)); // ← actualiza en el índice correcto
      return pedido;
    }
  }

  return null; // no encontrado
};

export const deletePedidoById = async (id) => {
  const key = getTodayKey();
  const pedidos = await client.lRange(key, 0, -1);

  for (let i = 0; i < pedidos.length; i++) {
    const pedido = JSON.parse(pedidos[i]);

    if (Number(pedido.id) === Number(id)) {
      // Redis no tiene "eliminar por índice" directo,
      // se usa este truco: marcar y luego limpiar
      await client.lSet(key, i, "__DELETED__");
      await client.lRem(key, 1, "__DELETED__");
      return pedido;
    }
  }

  return null;
};

export const updatePedidoCompleto = async (id, datosnuevos) => {
  const key = getTodayKey();
  const pedidos = await client.lRange(key, 0, -1);

  for (let i = 0; i < pedidos.length; i++) {
    const pedido = JSON.parse(pedidos[i]);

    if (Number(pedido.id) === Number(id)) {
      const pedidoActualizado = {
        ...datosnuevos,
        id: pedido.id,       // conservar id original
        fecha: pedido.fecha  // conservar fecha original
      };

      await client.lSet(key, i, JSON.stringify(pedidoActualizado));
      return pedidoActualizado;
    }
  }

  return null;
};