import { User } from "#models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "No user with such email found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong password. Please try again" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecretKey, { expiresIn: "1h" });

    user.token = token;
    await user.save();

    return res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
  } catch (err) {
    next(err);
  }
};
