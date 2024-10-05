import express from "express";
import { health } from "../controller/health.controller.js";

const healthRouter = express.Router();

healthRouter.get("/", health);


export default healthRouter;