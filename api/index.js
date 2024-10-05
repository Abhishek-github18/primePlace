import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import healthRouter from "./routes/health.route.js" ;
import authRouter from "./routes/auth.route.js";

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

app.use((error, req, res, next)=>{
    const statusCode = error.status || 500;
    const message = error.message || "Internal server error";

    res.status(statusCode).json({
        status: false,
        message
    })
})

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);


app.listen(3000, () => console.log("Listening on port 3000"));
