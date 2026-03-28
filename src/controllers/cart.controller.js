import prisma from "../prisma/client.js";

// ➕ ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cakeId, quantity } = req.body;

    const cakeIdInt = parseInt(cakeId);
    const qty = Math.max(1, Number(quantity) || 1);

    // 1. หา cart ของ user
    let cart = await prisma.cart.findFirst({
      where: { userId },
    });

    // ถ้าไม่มี → สร้างใหม่
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // 2. เช็คว่ามี item นี้อยู่แล้วไหม
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        cakeId: cakeIdInt,
      },
    });

    // 3. ถ้ามี → update quantity
    if (existingItem) {
      const updated = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + qty,
        },
      });

      return res.json({
        message: "Updated quantity 💀🔥",
        item: updated,
      });
    }

    // 4. ถ้าไม่มี → create ใหม่
    const item = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        cakeId: cakeIdInt,
        quantity: qty,
      },
    });

    return res.json({
      message: "Added to cart 💀🔥",
      item,
    });
  } catch (err) {
    console.log("🔥 ADD ERROR:", err);
    return res.status(500).json({ message: "Cart error 💀" });
  }
};

// 📦 GET CART
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            cake: true,
          },
        },
      },
    });

    if (!cart) {
      return res.json({ items: [] });
    }

    return res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: "Get cart error 💀" });
  }
};

// ❌ REMOVE ITEM
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    await prisma.cartItem.delete({
      where: { id: Number(itemId) },
    });

    return res.json({ message: "Removed from cart 💀🔥" });
  } catch (err) {
    return res.status(500).json({ message: "Remove error 💀" });
  }
};

// 🔁 UPDATE ITEM
export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const item = await prisma.cartItem.update({
      where: { id: Number(itemId) },
      data: { quantity: Math.max(1, Number(quantity)) },
    });

    res.json({
      message: "Updated 💀🔥",
      item,
    });
  } catch (err) {
    console.log("🔥 UPDATE ERROR:", err);
    res.status(500).json({ message: "Update error 💀" });
  }
};