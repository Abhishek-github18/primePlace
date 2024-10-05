import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
export const signup = async (req, res, next) => {
  try {
    const salt = process.env.Salt;
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 2);

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
    next(err);
  }
};
