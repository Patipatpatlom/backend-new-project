import createError from "http-errors";

function adminCheck(req, res, next) {
  try {
    // 🔥 ต้องมี user ก่อน
    if (!req.user) {
      return next(createError(401, "Unauthorized"));
    }

    // 🔥 เช็ค role admin
    if (req.user.role.toLowerCase() !== "admin") {
      return next(createError(403, "Admin only"));
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default adminCheck;