import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controllers.js";

import { protect } from "../middleware/protect.js";

const router = express.Router();

// ======================= AUTH =======================

// 🟢 REGISTER
router.post("/register", registerController);

// 🔵 LOGIN
router.post("/login", loginController);

// ======================= PROTECTED =======================

// 👤 GET CURRENT USER (TEST TOKEN)
router.get("/me", protect, (req, res) => {
  res.json({
    message: "Protected route working 💀🔥",
    user: req.user,
  });
});

// 🔐 VERIFY TOKEN (ใช้ตอน reload page / auto login)
router.get("/verify", protect, (req, res) => {
  res.json({
    valid: true,
    user: req.user,
  });
});

// 🚪 LOGOUT (frontend ลบ token เป็นหลัก แต่มี route ให้ดูโปร)
router.post("/logout", (req, res) => {
  res.json({
    message: "Logout success (just remove token client side) 💀🔥",
  });
});

export default router;