import {
  createDessertController,
  deleteDessertController,
  getDessertsController,
  getDessertController,
} from "../controllers/dessert.controllers.js";

import express from "express";

const router = express.Router();

// GET all desserts
router.get("/", getDessertsController);

// GET one dessert
router.get("/:id", getDessertController);

// POST create dessert
router.post("/", createDessertController);

// DELETE dessert
router.delete("/:id", deleteDessertController);

export default router;