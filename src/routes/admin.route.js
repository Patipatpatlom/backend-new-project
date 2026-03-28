import express from "express";
import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

// admin ดู order
router.get("/orders", protect, getAllOrders);

// admin update status
router.patch("/orders/:orderId", protect, updateOrderStatus);

export default router;