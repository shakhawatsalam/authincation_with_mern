import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import { authRouter } from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // * allows us to parse incoming request:req.body
app.use(cookieParser()); // * allows us to parse incoming cookies

app.use("/api/auth/", authRouter);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is Running on Port: 🚀 🚀 🚀", PORT);
});

// mongodb://127.0.0.1:27017/learning_managemant
