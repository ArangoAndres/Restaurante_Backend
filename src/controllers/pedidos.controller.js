import { savePedido, getPedidos, deletePedidos } from "../services/pedidos.service.js";

export const createPedido = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Pedido vacío" });
    }

    await savePedido(req.body);

    res.json({ message: "Pedido guardado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error guardando pedido" });
  }
};

export const fetchPedidos = async (req, res) => {
  try {
    const pedidos = await getPedidos();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo pedidos" });
  }
};

export const removePedidos = async (req, res) => {
  try {
    await deletePedidos();
    res.json({ message: "Pedidos eliminados manualmente" });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando pedidos" });
  }
};