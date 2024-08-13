import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import { authRouter } from "./routes/auth.route.js";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // * allows us to parse incoming request:req.body
app.use(cookieParser()); // * allows us to parse incoming cookies

app.use("/api/auth/", authRouter);
console.log(process.env.NODE_ENV, "lol");
if (process.env.NODE_ENV === "production") {
  console.log("helloworl : 🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗");
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is Running on Port: 🚀 🚀 🚀", PORT);
});

// mongodb://127.0.0.1:27017/learning_managemant
