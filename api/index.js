import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import healthRouter from "./routes/health.route.js" ;

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

    app.use("/api/health", healthRouter);

app.listen(3000, () => console.log("Listening on port 3000"));
