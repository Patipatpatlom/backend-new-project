import prisma from "../lib/prisma.js";

export const createPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId, method } = req.body;

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId
      }
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "PENDING") {
      return res.status(400).json({ message: "Order not available for payment" });
    }

    // ➜ update order status
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "WAITING_PAYMENT" }
    });

    // ➜ create payment
    const payment = await prisma.payment.create({
      data: {
        orderId,
        method: method || "MOCK",
        status: "PENDING"
      }
    });

    // 💀 COD = จบเลย
    if (method === "COD") {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "PAID" }
      });

      await prisma.order.update({
        where: { id: orderId },
        data: { status: "CONFIRMED" }
      });

      return res.json({
        message: "COD confirmed 💀🔥",
        order
      });
    }

    res.json({
      message: "Redirect to payment",
      payment,
      mockUrl: `http://fake-pay.com/pay/${payment.id}`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};