import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
export const signup = async (req, res) => {
  const salt = process.env.Salt;
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 2);

  try {
    await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({
      status: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message || "Internal server error",
    });
  }
};
