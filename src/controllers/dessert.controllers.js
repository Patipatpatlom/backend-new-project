import {
  createDessert,
  deleteDessert,
  getAllDesserts,
  getDessertById,
  updateDessert,
} from "../services/dessert.service.js";

// ======================= GET ALL =======================
export const getDessertsController = async (req, res, next) => {
  try {
    const data = await getAllDesserts();

    res.json({
      message: "Get all desserts success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ======================= GET BY ID =======================
export const getDessertController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await getDessertById(Number(id));

    res.json({
      message: "Get dessert success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ======================= CREATE =======================
export const createDessertController = async (req, res, next) => {
  try {
    const { name, price, image } = req.body;

    const data = await createDessert(name, price, image);

    res.status(201).json({
      message: "Create dessert success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ======================= DELETE =======================
export const deleteDessertController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await deleteDessert(Number(id));

    res.json({
      message: "Delete dessert success",
      data,
    });
  } catch (error) {
    next(error);
  }
};