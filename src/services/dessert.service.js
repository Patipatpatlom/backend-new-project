import db from "../config/db.js";

// ======================= SERVICE =======================

// 🔍 GET ALL DESSERTS
export const getAllDesserts = async () => {
  return await db.dessert.findMany();
};

// 🔍 GET DESSERT BY ID
export const getDessertById = async (id) => {
  return await db.dessert.findUnique({
    where: { id },
  });
};

// ➕ CREATE DESSERT
export const createDessert = async (name, price, image) => {
  return await db.dessert.create({
    data: {
      name,
      price,
      image,
    },
  });
};

// ✏️ UPDATE DESSERT
export const updateDessert = async (id, name, price, image) => {
  return await db.dessert.update({
    where: { id },
    data: {
      name,
      price,
      image,
    },
  });
};

// ❌ DELETE DESSERT
export const deleteDessert = async (id) => {
  return await db.dessert.delete({
    where: { id },
  });
};