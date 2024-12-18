import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import healthRouter from "./routes/health.route.js" ;
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import listRouter from "./routes/list.route.js";
import cors from "cors";
import reattachCookie from "./utils/reAttachCookie.js";

dotenv.config();

const mongo_url = process.env.MONGO_URL;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://prime-place.vercel.app"], // Allow these origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    credentials: true, // Allow cookies and authentication headers
  })
);
app.use(reattachCookie);



app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use('/api/listing', listRouter);



app.use((error, req, res, next)=>{
    console.log("Inside error middleware", error.message);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";

    res.status(statusCode).json({
        status: false,
        message
    })
})


app.listen(3000, () => console.log("Listening on port 3000"));
