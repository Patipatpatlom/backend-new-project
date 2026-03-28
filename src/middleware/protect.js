import jwt from "jsonwebtoken";
import createError from "http-errors";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token 💀" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // 💀 สำคัญมาก

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token 💀" });
  }
};