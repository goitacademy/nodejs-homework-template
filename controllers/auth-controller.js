import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const { JWT_SECRET } = process.env;

import User from "../models/User.js";
// ? // Імпорт хелпера для створення помилки ;
import { HttpError } from "../helpers/index.js";
// ? // Імпорт врапера обгортки функцій в try/catch ;
import { ctrlWrapper } from "../decorators/index.js";

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};
const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const { _id: id } = user;
  const payload = {
    id: user._id,
  };
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
  const refreschToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

  await User.findByIdAndUpdate(id, { accessToken, refreschToken });
  res.json({ accessToken, refreschToken });
};
const getCurrent = (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email });
};
const signOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { accessToken: "", refreschToken: "" });
  res.json({
    message: "Signout success",
  });
};
const refresch = async (req, res) => {
  const { refreschToken } = req.body;
  try {
    const { id } = jwt.verify(refreschToken, JWT_SECRET);
    const user = await User.findOne({ refreschToken });
    if (!user) {
      throw HttpError(403);
    }
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
    const refreschToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
    await User.findByIdAndUpdate(id, { accessToken, refreschToken });
    res.json({ accessToken, refreschToken });
  } catch {
    throw HttpError(403);
  }
};
export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  signOut: ctrlWrapper(signOut),
  refresch: ctrlWrapper(refresch),
};
