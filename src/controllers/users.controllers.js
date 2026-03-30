import bcrypt from "bcrypt";
import { editUser } from "../services/auth.service.js";
import db from "../config/db.js";


export async function editMeController(req, res, next) {
  try {
    const { email } = req.user;
    const { username, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    await editUser(email, username, hashPassword);

    res.status(200).json({ message: "Profile updated" });
  } catch (error) {
    next(error);
  }
}

// GET USER BY ID
export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await db.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        password: false, // กันหลุด 💀
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


//Update user by admin

export const adminUpdateUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    const user = await db.user.update({
      where: { id: Number(id) },
      data: { username, email, role },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        updatedAt: true,
      },
    });

    res.json({
      status: "success",
      message: "Admin updated user 💀🔥",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
