export const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") { // 👈 ต้องตัวใหญ่
    return res.status(403).json({
      message: "Admin only 💀",
    });
  }
  next();
};