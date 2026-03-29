import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

import { protect } from "../middleware/protect.js";

const router = express.Router();

// 👤 USER
router.post("/", protect, createOrder);
router.get("/me", protect, getMyOrders);

// 🔥 ADMIN
router.get("/", protect, getAllOrders);
router.patch("/:orderId/status", protect, updateOrderStatus);

export default router;