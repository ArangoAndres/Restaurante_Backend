import { savePedido, getPedidos, deletePedidos,deletePedidoById,updatePedidoEstado,updatePedidoCompleto } from "../services/pedidos.service.js";


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

export const fetchPedidosCentro = async (req, res) => {
  try {
    const pedidos = await getPedidos();

    const filtrados = pedidos.filter(
      p => p.restaurante?.toLowerCase() === "centro"
    );

    res.json(filtrados);

  } catch (error) {
    res.status(500).json({ error: "Error obteniendo pedidos centro" });
  }
};

export const fetchPedidosBolivar = async (req, res) => {
  try {
    const pedidos = await getPedidos();

    const filtrados = pedidos.filter(
      p => p.restaurante?.toLowerCase() === "bolivar"
    );

    res.json(filtrados);

  } catch (error) {
    res.status(500).json({ error: "Error obteniendo pedidos bolivar" });
  }
};

export const fetchPedidoBolivarById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidos = await getPedidos();
    
    const pedido = pedidos.find(
      p =>
      
       Number(p.id) === Number(id)
    );
   
    

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json(pedido);

  } catch (error) {
    res.status(500).json({ error: "Error obteniendo pedido" });
  }
};


export const eliminarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pedidoEliminado = await deletePedidoById(id);
    
    if (!pedidoEliminado) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    
    res.json({ message: "Pedido eliminado correctamente", pedido: pedidoEliminado });
    
  } catch (error) {
    res.status(500).json({ message: "Error eliminando pedido", error });
  }
};

export const actualizarEstadoPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const pedidoActualizado = await updatePedidoEstado(id, estado);

    if (!pedidoActualizado) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json({ message: "Estado actualizado correctamente", pedido: pedidoActualizado });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error actualizando estado" });
  }
};


export const editarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedidoActualizado = await updatePedidoCompleto(id, req.body);

    if (!pedidoActualizado) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json({
      message: "Pedido actualizado correctamente",
      pedido: pedidoActualizado
    });

  } catch (error) {
    res.status(500).json({ message: "Error actualizando pedido", error });
  }
};