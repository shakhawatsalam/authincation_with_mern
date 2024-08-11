import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import { authRouter } from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world lol");
});

app.use("/api/auth/", authRouter);

app.listen(3000, () => {
  connectDB();
  console.log("Server is Running on Port 3000");
});

// mongodb://127.0.0.1:27017/learning_managemant
