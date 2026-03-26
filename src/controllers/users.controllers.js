import bcrypt from "bcrypt";
import { editUser } from "../services/auth.service.js";



export async function editMeController(req, res, next) {
  const { email } = req.user;
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await editUser(email, username, hashPassword);
    res.status(200).json({ message: "Profile updated" });
} catch (error) {
    next(error);
  }
//   res.send("edit me");
}

