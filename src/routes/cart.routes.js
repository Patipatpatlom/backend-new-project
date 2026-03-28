import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cart.controller.js";

import { protect } from "../middleware/protect.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/:itemId", protect, removeFromCart);
router.put("/:itemId", protect, updateCartItem);

export default router;