export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "error",
      message: "Admin only 💀",
    });
  }
  next();
};