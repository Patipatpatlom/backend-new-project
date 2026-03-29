import prisma from "../prisma/client.js";
import {
  getAllDesserts,
  getDessertById,
  createDessert,
  updateDessert,
  deleteDessert,
} from "../services/dessert.service.js";

// GET ALL
export const getDessertsController = async (req, res, next) => {
  try {
    const data = await getAllDesserts();
    res.json({ message: "ok", data });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
export const getDessertController = async (req, res, next) => {
  try {
    const data = await getDessertById(Number(req.params.id));
    res.json({ message: "ok", data });
  } catch (err) {
    next(err);
  }
};

// CREATE
export const createDessertController = async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    console.log("BODY:", req.body); // 👈 เพิ่ม

    const data = await createDessert(
      name,
      Number(price), // 🔥 กันพัง
      image,
      category
    );

    res.status(201).json({ message: "created", data });
  } catch (err) {
    console.error("💀 CREATE ERROR:", err); // 👈 สำคัญมาก

    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE
export const updateDessertController = async (req, res) => {
  console.log("🔥 UPDATE HIT");

  try {
    const { id } = req.params;
    const { name, price } = req.body;

    console.log("PARAM ID:", id);
    console.log("BODY:", req.body);

    // 🔍 เช็คว่ามี item นี้จริงไหม
    const existing = await prisma.cake.findUnique({
      where: { id: Number(id) },
    });

    console.log("FOUND:", existing);

    if (!existing) {
      return res.status(404).json({ message: "Cake not found 💀" });
    }

    const updated = await prisma.cake.update({
      where: { id: Number(id) },
      data: {
        name,
        price: Number(price),
      },
    });

    console.log("✅ UPDATED:", updated);

    res.json(updated);
  } catch (err) {
    console.error("💀 UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteDessertController = async (req, res, next) => {
  try {
    const data = await deleteDessert(Number(req.params.id));
    res.json({ message: "deleted", data });
  } catch (err) {
    next(err);
  }
};