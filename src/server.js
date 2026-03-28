import express from "express";
import cors from "cors";
import db from "./config/db.js";

import authRouter from "./routes/auth.routes.js";
import usersRouter from "./routes/users.routes.js";
import dessertRouter from "./routes/dessert.routes.js";
import orderRoutes from "./routes/order.routes.js";
import errHandler from "./middleware/errHandler.js";
import cartRoutes from "./routes/cart.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import adminRoutes from "./routes/admin.route.js";



const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("🔥 REQUEST:", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome Api v0.1.0");
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/desserts", dessertRouter);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/admin", adminRoutes);

// Error handler
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});