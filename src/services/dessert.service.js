import db from "../config/db.js";

// ======================= SERVICE =======================

// 🔍 GET ALL DESSERTS
export const getAllDesserts = async () => {
  return await db.cake.findMany();
};

// 🔍 GET DESSERT BY ID
export const getDessertById = async (id) => {
  return await db.cake.findUnique({
    where: { id },
  });
};

// ➕ CREATE DESSERT
export const createDessert = async (name, price, image, category) => {
  return await db.cake.create({
    data: {
      name,
      price,
      image,
      category,
    },
  });
};

// ✏️ UPDATE DESSERT
export const updateDessert = async (id, name, price, image, category) => {
  return await db.cake.update({
    where: { id },
    data: {
      name,
      price,
      image,
      category,
    },
  });
};

// ❌ DELETE DESSERT
export const deleteDessert = async (id) => {
  return await db.cake.delete({
    where: { id },
  });
};