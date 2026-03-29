import jwt from "jsonwebtoken";

// 🔐 AUTH MIDDLEWARE
export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token 💀" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // 💀 ต้องมี id ใน token

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token 💀" });
  }
};

// 👑 ROLE CHECK (ADMIN / USER)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "No user 💀" });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden 💀 (no permission)" });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
};