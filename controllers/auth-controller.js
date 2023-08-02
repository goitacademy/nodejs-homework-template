import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import "dotenv/config";

import User from "../models/user-model.js";

import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

// console.log(process.env.JWT_SECRET);
const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Password or email is wrong");
  }

  const payload = {
    id: user._id,
  };
  // generation token + jwt
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  // await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
};
