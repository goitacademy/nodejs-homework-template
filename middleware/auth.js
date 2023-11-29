import jwt from "jsonwebtoken";
import { User } from "#models/User.js";
import dotenv from "dotenv";

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

export const checkToken = async (req, res, next) => {
  if (!req.header("Authorization")) {
    return res.status(401).json({ message: "'Authorization' header is missing" });
  }

  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    const user = await User.findOne({ _id: decoded.userId, token });
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    user.userId = user._id;

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized" });
  }
};
