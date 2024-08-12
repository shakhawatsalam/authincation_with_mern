import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized- no token proviced" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized- invalid token" });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
