import { Router } from "express";
import { testRedis } from "../controllers/redis.controller.js";
import { createPedido, fetchPedidos, removePedidos } from "../controllers/pedidos.controller.js";

const router = Router();

router.get("/test", testRedis);
router.post("/pedidos", createPedido);
router.get("/pedidos", fetchPedidos);
router.delete("/pedidos", removePedidos);

export default router;