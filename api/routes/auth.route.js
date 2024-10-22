import express from "express"
import { oauth, signin, signout, signup } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup)

authRouter.post('/signin', signin);

authRouter.post('/google', oauth);

authRouter.post('/signout', signout);


export default authRouter