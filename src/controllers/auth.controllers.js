import { prisma } from "../config/prismaClient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import createError from "http-errors";

// ======================= SERVICE =======================

// 🔍 หา user ด้วย email
const findUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: { email },
  });
};

// ✅ สร้าง user (ไม่มี name แล้ว)
const createUser = async (username, email, password, role) => {
  return await prisma.user.create({
    data: {
      username,
      email,
      password,
      role,
    },
  });
};

// 🔐 สร้าง token
const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "1d",
    }
  );
};

// ======================= CONTROLLER =======================

// ================= REGISTER =================
export const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // ✅ 1. เช็คค่าว่าง
    if (!username || !email || !password) {
      throw createError(400, "Please fill all fields");
    }

    // ✅ 2. normalize email
    const normalizedEmail = email.toLowerCase();

    // ✅ 3. เช็ค email ซ้ำ
    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
      throw createError(400, "Email already exist");
    }

    // ✅ 4. เช็ค password
    if (password.length < 6) {
      throw createError(400, "Password must be at least 6 characters");
    }

    // ✅ 5. hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // ✅ 6. create user
    const newUser = await createUser(
      username,
      normalizedEmail,
      hashPassword
    );

    res.status(201).json({
      message: "Register Success 🎉",
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      },
    });

  } catch (error) {
    next(error);
  }
};

// ================= LOGIN =================
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ✅ 1. เช็คค่าว่าง
    if (!email || !password) {
      throw createError(400, "Please fill all fields");
    }

    const normalizedEmail = email.toLowerCase();

    // ✅ 2. หา user
    const user = await findUserByEmail(normalizedEmail);
    if (!user) {
      throw createError(401, "Invalid credentials");
    }

    // ✅ 3. เช็ค password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createError(401, "Invalid credentials");
    }

    // ✅ 4. สร้าง token
    const token = createToken(user);

    res.status(200).json({
      message: "Login Success 🎉",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });

  } catch (error) {
    next(error);
  }
};