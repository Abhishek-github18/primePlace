import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import healthRouter from "./routes/health.route.js" ;
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import listRouter from "./routes/list.route.js";

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

app.use(function(req, res, next) {
  const allowedOrigins = ['http://localhost:5173', 'https://prime-place.vercel.app'];
  const origin = req.headers.origin;

  // Set CORS headers only for allowed origins
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, UPDATE');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Enable cookies with cross-origin requests

  next();
});


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
