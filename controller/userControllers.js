import { getUserByEmail, updateUser } from "../models/users.js";
import { User } from "../service/schemas/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
const secret = process.env.SECRET;
export const registration = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  try {
    const newUser = new User({ email, subscription });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(secret);
  if (!user || !user.validPassword(password)) {
    return res.status(400).json({ message: "incorect email or password" });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  const result = await updateUser(email, { token });
  return res.status(200).json({ token, user });
};

export const LogOut = async (req, res, next) => {
  
};
