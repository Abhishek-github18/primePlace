import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const salt = process.env.Salt;
    const { username, email, password } = req.body;
    // let hashedPassword = "";

    const hashedPassword = await bcrypt.hash(password, 10);  // Make sure password is valid before hashing

    
    console.log("hashedPassword", hashedPassword);

    const user = await User.create({
      username,
      email,
      "password": hashedPassword,
    });
    console.log("User created in cosmos db", user);
    res.status(201).json({
      status: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log("Error", err);
    if (err.code === 11000) {
      next(errorHandler(409, "Username or Email already exists"));
    }
    next(errorHandler(500, "Internal server error"));
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;

  const validUser = await User.findOne({ username });
  if (!validUser) {
    next(errorHandler(404, "User not registered"));
    return;
  }
  console.log("validUser", validUser);
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        next(errorHandler(500, "Internal server error"));
      }
     console.log(hash);
    });
  });
  bcrypt.compare(password, validUser.password, function (err, result) {
    if (err) {
      console.log("Error while comparing signin password", err);
      next(errorHandler(500, "Internal server error"));
    } else {
      if (result) {
        const token = jwt.sign(
          {
            id: validUser._id,
          },
          process.env.SecretKey,
          { expiresIn: "1h" }
        );
        res.cookie("token", token, { httpOnly: true }).status(200).json({
          status: true,
          username: validUser.username,
          id: validUser._id,
        });
      } else {
        next(errorHandler(401, "Invalid credentials"));
        return;
      }
    }
  });
};
