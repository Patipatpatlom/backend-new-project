import jwt from "jsonwebtoken";

const SECRET = "MY_SUPER_SECRET_KEY";

export const signToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "7d" }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};