import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";
import { ctrlErrorWrapper } from "../decorators/index.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

const EmailExist = (email) => HttpError(409, `${email} already used`);
const InvalidEmailOrPassword = () =>
  HttpError(401, "Invalid email or password");

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw EmailExist(email);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw InvalidEmailOrPassword();
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw InvalidEmailOrPassword();
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "Signout success" });
};

export default {
  register: ctrlErrorWrapper(register),
  login: ctrlErrorWrapper(login),
  getCurrent: ctrlErrorWrapper(getCurrent),
  logout: ctrlErrorWrapper(logout),
};
