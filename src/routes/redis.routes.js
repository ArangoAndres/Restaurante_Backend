import { Router } from "express";
import { testRedis } from "../controllers/redis.controller.js";
import { createPedido, fetchPedidos, removePedidos, fetchPedidosBolivar, fetchPedidosCentro, fetchPedidoBolivarById ,
    eliminarPedido,actualizarEstadoPago, editarPedido
} from "../controllers/pedidos.controller.js";

const router = Router();

router.get("/test", testRedis);
router.post("/pedidos", createPedido);
router.get("/pedidos", fetchPedidos);
router.delete("/pedidos", removePedidos);
router.get("/pedidos/centro", fetchPedidosCentro);
router.get("/pedidos/bolivar", fetchPedidosBolivar);
router.get("/pedidos/bolivar/:id", fetchPedidoBolivarById);
router.delete("/pedidos/:id", eliminarPedido);
router.patch("/pedidos/:id/pago", actualizarEstadoPago);
router.put("/pedidos/:id/editar", editarPedido);

export default router;