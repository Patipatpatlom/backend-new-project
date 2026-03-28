import express from "express";
import { createPayment } from "../controllers/payment.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createPayment);

export default router;