import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const userReg = async (req, res) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email });
  if (isUser) {
    throw HttpError(409, `"Email in use"`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user,
  });
};

const userLog = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, `"Email or password is wrong"`);
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, `"Email or password is wrong"`);
  }
  const { _id: id } = user;
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: `"Logout success"`,
  });
};

const changeSubscript = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.params;
  console.log(subscription);
  if (subscription === "starter" || "pro" || "business") {
    const user = await User.findByIdAndUpdate(_id, { subscription });
    res.status(200).json({
      email: user.email,
      subscription,
    });
    return;
  }
  throw HttpError(409, "Subscription is not validate");
};

export default {
  userReg: ctrlWrapper(userReg),
  userLog: ctrlWrapper(userLog),
  getCurrent: ctrlWrapper(getCurrent),
  logOut: ctrlWrapper(logOut),
  changeSubscript: ctrlWrapper(changeSubscript),
};
