import prisma from "../lib/prisma.js";

export const paymentWebhook = async (req, res) => {
  try {
    const { paymentId, status } = req.body;

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { order: true }
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // 💀 SUCCESS
    if (status === "SUCCESS") {

      await prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: { id: paymentId },
          data: { status: "PAID" }
        });

        await tx.order.update({
          where: { id: payment.orderId },
          data: { status: "PAID" }
        });
      });

      return res.json({ message: "Payment success 💀🔥" });
    }

    // ❌ FAILED
    if (status === "FAILED") {

      await prisma.payment.update({
        where: { id: paymentId },
        data: { status: "FAILED" }
      });

      await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: "CANCELED" }
      });

      return res.json({ message: "Payment failed" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Webhook error" });
  }
};