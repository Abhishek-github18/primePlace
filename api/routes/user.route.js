import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { deleteUser, getUserListings, updateProfile } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post('/updateProfile', verifyUser, updateProfile);
userRouter.delete('/deleteUser', verifyUser, deleteUser);
userRouter.get('/listings/:id', verifyUser, getUserListings);

export default userRouter;
