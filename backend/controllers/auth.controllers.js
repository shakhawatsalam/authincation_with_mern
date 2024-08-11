import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    // * IF any fields are missing
    if (!email || !password || !name) {
      throw new Error("All fiends are required");
    }
    // * Checking if there is user already exist
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // * hasing Password
    const hashedPassword = await bcryptjs.hash(password, 10);
    // * verificationCode
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    // * new User
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await user.save();

    // * generate JWT
    generateTokenAndSetCookie(res, user._id);
    // * Send verification email
    await sendVerificationEmail(user.email, verificationToken);
    // * send res
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const login = async (req, res) => {
  res.send("login route");
};
export const logout = async (req, res) => {
  res.send("logout route");
};
