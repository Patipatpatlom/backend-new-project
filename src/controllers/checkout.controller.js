import prisma from "../lib/prisma.js";

export const checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address } = req.body;

    // 1. ดึง cart
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { cake: true }
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty 💀" });
    }

    // 2. คำนวณ total
    let totalPrice = 0;

    for (const item of cartItems) {
      totalPrice += item.quantity * item.cake.price;
    }

    // 3. transaction (สำคัญมาก)
    const order = await prisma.$transaction(async (tx) => {

      // ➜ create order
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalPrice,
          address: address || "",
          status: "PENDING"
        }
      });

      // ➜ create order items (snapshot price)
      await tx.orderItem.createMany({
        data: cartItems.map((item) => ({
          orderId: newOrder.id,
          cakeId: item.cakeId,
          quantity: item.quantity,
          price: item.cake.price // 💀 snapshot
        }))
      });

      // ➜ clear cart
      await tx.cartItem.deleteMany({
        where: { userId }
      });

      return newOrder;
    });

    res.json({
      message: "Checkout success 💀🔥",
      order
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};