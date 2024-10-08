import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
export const signup = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const salt = process.env.Salt;
    const { username, email, password } = req.body;
    let hashedPassword = "";

    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          next(errorHandler(500, "Internal server error"));
        }
        hashedPassword = hash;
      });
    });

    const user = await User.create({
      username,
      email,
      password,
    });
    console.log("User created in cosmos db", user);
    res.status(201).json({
      status: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log("Error", err);
    if(err.code === 11000){
        next(errorHandler(409, "Username or Email already exists"));
    }
    next(errorHandler(500, "Internal server error"));
  }
};
