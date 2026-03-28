import prisma from "../config/prisma.js";

// 📦 ดึง order ทั้งหมด
export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          cake: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

// 🔄 เปลี่ยน status
export const updateOrderStatus = async (id, status) => {
  return await prisma.order.update({
    where: { id: Number(id) },
    data: { status }
  });
};