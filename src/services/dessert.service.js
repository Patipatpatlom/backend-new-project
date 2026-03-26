import { prisma } from "../config/prismaClient.js";


export const getDetssert = async () => {
  const desert = await prisma.dessert.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
    },
  });
  return desert;
};

export const addDessert = async (name, price, category) => {
  const desert = await prisma.dessert.create({
    data: {
      name,
      price,
      category,
    },
  });
  return desert;
};

export const findDessert = async (id) => {
  const desert = await prisma.dessert.findFirst({
    where: {
      id: id,
    },
  });
  return desert;
};

export const deleteDessert = async (id) => {
  await prisma.dessert.delete({
    where: { id: id },
  });
};
