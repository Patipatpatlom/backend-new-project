import prisma from "../prisma/client.js";

console.log("PRISMA KEYS:", Object.keys(prisma));

/* =========================
   📦 CREATE ORDER
========================= */
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items 💀" });
    }

    let totalPrice = 0;
    const orderItemsData = [];

    for (const item of items) {
      if (!item.cakeId || item.quantity <= 0) {
        return res.status(400).json({ message: "Invalid item 💀" });
      }

      const cake = await prisma.cake.findUnique({
        where: { id: item.cakeId },
      });

      if (!cake) {
        return res.status(404).json({ message: "Cake not found 💀" });
      }

      totalPrice += cake.price * item.quantity;

      orderItemsData.push({
        cakeId: item.cakeId,
        quantity: item.quantity,
        price: cake.price,
      });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        address: address || null,
        totalPrice,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Create order failed 💀",
      error: error.message,
    });
  }
};

/* =========================
   📦 GET ALL ORDERS (ADMIN)
========================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Get orders failed 💀" });
  }
};

/* =========================
   👤 GET MY ORDERS
========================= */
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   🔥 UPDATE ORDER STATUS (ADMIN)
========================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const allowed = [
      "PENDING",
      "PAID",
      "SHIPPED",
      "COMPLETED",
      "CANCELLED",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status 💀" });
    }

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

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Update status failed 💀",
      error: error.message,
    });
  }
};