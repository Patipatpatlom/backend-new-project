import prisma from "../src/config/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  try {
    console.log("🌱 Start seeding...");

    const hash = await bcrypt.hash("123456", 10);

    // 👤 1. CREATE USER FIRST
    const admin = await prisma.user.create({
      data: {
        username: "Admin",
        email: "admin@test.com",
        password: hash,
        role: "ADMIN",
      },
    });

    console.log("✅ admin created:", admin.id);

    const user = await prisma.user.create({
      data: {
        username: "User",
        email: "user@test.com",
        password: hash,
        role: "USER",
      },
    });

    // 🍰 2. CREATE CAKE
    const cake = await prisma.cake.create({
      data: {
        name: "Chocolate Cake",
        price: 100,
        category: "chocolate",
      },
    });

    // 📦 3. CREATE ORDER (ใช้ admin/user ต้องมีตัวแปรก่อน)
    const order = await prisma.order.create({
      data: {
        userId: user.id, // 👈 ต้องมี user ก่อน
        totalPrice: 100,
        status: "pending",
        items: {
          create: [
            {
              cakeId: cake.id,
              quantity: 1,
              price: 100,
            },
          ],
        },
      },
    });

    console.log("📦 order created:", order.id);

    console.log("🎉 SEED DONE!");
  } catch (err) {
    console.error("💀 SEED ERROR:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();