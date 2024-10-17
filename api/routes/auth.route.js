import express from "express"
import { oauth, signin, signup } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup)

authRouter.post('/signin', signin);

authRouter.post('/google', oauth);


export default authRouter