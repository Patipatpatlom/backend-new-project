import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import createError from "http-errors";

// ======================= SERVICE =======================

// 🔍 หา user ด้วย email
export const findUserByEmail = async (email) => {
  return await db.user.findFirst({
    where: { email },
  });
};

// 🔍 หา user ด้วย id
export const findUserById = async (id) => {
  return await db.user.findFirst({
    where: { id },
  });
};

// ✅ CREATE USER
export const createUser = async (username, email, password, role = "USER") => {
  return await db.user.create({
    data: {
      username,
      email,
      password,
      role,
    },
  });
};

// ✏️ EDIT USER
export const editUser = async (email, username, password) => {
  return await db.user.update({
    where: { email },
    data: {
      username,
      password,
    },
  });
};

// 🔐 CREATE TOKEN
export const createToken = (user) => {
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

// REGISTER
export const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw createError(400, "Please fill all fields");
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
      throw createError(400, "Email already exist");
    }

    if (password.length < 6) {
      throw createError(400, "Password must be at least 6 characters");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(
      username,
      normalizedEmail,
      hashPassword,
      "USER"
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

// LOGIN
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError(400, "Please fill all fields");
    }

    const normalizedEmail = email.toLowerCase();

    const user = await findUserByEmail(normalizedEmail);
    if (!user) {
      throw createError(401, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createError(401, "Invalid credentials");
    }

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