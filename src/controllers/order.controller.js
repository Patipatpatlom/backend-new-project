import prisma from "../prisma/client.js";

// 📦 GET ALL ORDERS (DEBUG VERSION)
export const getAllOrders = async (req, res) => {
  try {
    // 🔒 admin only
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Admin only 💀",
      });
    }

    // 🔥 STEP 1: เช็ค DB ล้วน ๆ ก่อน
    const orders = await prisma.order.findMany();

    res.json(orders);
  } catch (err) {
    console.log("🔥 REAL ERROR:", err); // 👈 ดูใน terminal
    res.status(500).json({
      message: "Get orders error 💀",
      error: err.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await prisma.order.findUnique({
      where: { id: Number(orderId) },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found 💀" });
    }

    const updated = await prisma.order.update({
      where: { id: Number(orderId) },
      data: { status },
    });

    res.json({
      message: "Updated 💀🔥",
      order: updated,
    });
  } catch (err) {
    console.log("🔥 UPDATE ERROR:", err);
    res.status(500).json({ message: "Update error 💀" });
  }
};