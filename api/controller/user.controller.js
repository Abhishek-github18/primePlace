import User from "../models/user.model.js";
import GoogleAccountUser from "../models/googleAccountUser.model.js";
import { errorHandler } from "../utils/errorHandler.js";
export const updateProfile = async (req, res, next) => {
  try {
    const { email, password, image, oauth, id } = req.body;

    console.log("req.body", req.body);

    const { id: _id } = req.user;

    if (id !== _id) {
      next(errorHandler(403, "Not authorised to update this profile"));
      return;
    }

    if (oauth) {
      const user = await GoogleAccountUser.findById(id);

      if (!user) {
        console.log("User not found in the db");
        next(errorHandler(404, "User not found"));
        return;
      } else {
        if (image) {
          user.image = image;
          const updatedUser = await user.save();
          console.log("updatedUser", updatedUser);
          res.status(200).json({
            status: true,
            message: "Profile updated successfully",
            id: updatedUser._id,
            oauth: true,
            username: updatedUser.name,
            image: updatedUser.image,
            email: updatedUser.email,
          });
        }
      }
    } else {
      const user = await User.findById(id);
      if (!user) {
        console.log("User not found in the db");
        next(errorHandler(404, "User not found"));
        return;
      } else {
        if (image) {
          user.image = image;
        }
        if (password) {
          const salt = process.env.Salt;
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
        }
        if (email !== user.email && email !== null && email !== "") {
          const user = await User.findOne({ email });
          console.log("user", user);
          if (user && user._id !== id) {
            next(errorHandler(409, "Email already exists"));
            return;
          }
          // user.email = email;
        }
        user.email = email;
        const updatedUser = await user.save();
        console.log("updatedUser", updatedUser);
        res.status(200).json({
          status: true,
          message: "Profile updated successfully",
          id: updatedUser._id,
          oauth: false,
          username: updatedUser.username,
          image: updatedUser.image,
          email: updatedUser.email,
        });
      }
    }
  } catch (error) {
    console.error(error);

    next(errorHandler(500, "Internal server error"));
  }
};

export const deleteUser = async (req, res, next) => {
  const { oauth, id } = req.body;
  const { id: _id } = req.user;

  if (id !== _id) {
    next(errorHandler(403, "You are not authorized to delete this account"));
    return;
  }
  let acknowledgement;

  try {
    if (oauth == true) {
      acknowledgement = await GoogleAccountUser.deleteOne({ id });
      console.log(acknowledgement);
    } else {
      acknowledgement = await User.deleteOne({ _id: id });
      console.log(acknowledgement);
    }
    if (acknowledgement.deletedCount == 0) {
      res.status(200).json({
        status: false,
        message: "Account not found",
      });
    } else {
      res.cookie("token", "", { httpOnly: true }).status(200).json({
        status: true,
        message: "Account deleted successfully",
      });
    }
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Internal server error"));
  }
};
