import express from "express";
import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

// 📦 admin ดู orders
router.get("/", protect, getAllOrders);

// 🔄 admin update status
router.patch("/:orderId", protect, updateOrderStatus);

export default router;