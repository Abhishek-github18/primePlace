import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { deleteUser, getUserListings, updateListing, updateProfile } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post('/updateProfile', verifyUser, updateProfile);
userRouter.delete('/deleteUser', verifyUser, deleteUser);
userRouter.get('/listings/:id', verifyUser, getUserListings);
userRouter.post('/update-listing/:id', verifyUser, updateListing);

export default userRouter;