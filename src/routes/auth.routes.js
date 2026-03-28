import express from "express"
import { loginController, registerController } from "../controllers/auth.controllers.js";
import { protect } from "../middleware/protect.js";

const router = express.Router()

router.get("/me", protect, (req, res) => {
  res.json({
    message: "Protected route working 💀🔥",
    user: req.user
  });
});

router.post("/register", registerController)
router.post("/login",loginController)


export default router;

