import express from "express";
import {
  getDessertsController,
  getDessertController,
  createDessertController,
  deleteDessertController,
  updateDessertController,
} from "../controllers/dessert.controller.js";
import { upload } from "../utils/upload.js";


const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded 💀",
    });
  }

  res.json({
    image: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

router.get("/", getDessertsController);
router.get("/:id", getDessertController);
router.post("/", createDessertController);
router.put("/:id", updateDessertController); 
router.delete("/:id", deleteDessertController);

export default router;