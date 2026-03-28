export const getAllOrders = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Admin only 💀",
      });
    }

    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            cake: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        // ❌ ปิด payment ก่อน
        // payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(orders);
  } catch (err) {
    console.log("🔥 GET ORDERS ERROR:", err);
    res.status(500).json({
      message: "Get orders error 💀",
      error: err.message,
    });
  }
};