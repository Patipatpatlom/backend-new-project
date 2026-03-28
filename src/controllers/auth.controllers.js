import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import createError from "http-errors";

// ======================= REGISTER =======================

export const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // validate
    if (!username || !email || !password) {
      throw createError(400, "Please fill all fields");
    }

    const normalizedEmail = email.toLowerCase();

    // check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw createError(400, "Email already exists");
    }

    if (password.length < 6) {
      throw createError(400, "Password must be at least 6 characters");
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user (FIXED ROLE = USER)
    const newUser = await prisma.user.create({
      data: {
        username,
        email: normalizedEmail,
        password: hashPassword,
        role: "USER",
      },
    });

    return res.status(201).json({
      message: "Register Success 🎉",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    next(error);
  }
};
;
// ======================= LOGIN =======================

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "Please fill all fields"));
    }

    const normalizedEmail = email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return next(createError(401, "Invalid credentials"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(createError(401, "Invalid credentials"));
    }

    // ✅ create token (ต้องอยู่ใน function)
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login Success 🎉",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    next(error);
  }
};