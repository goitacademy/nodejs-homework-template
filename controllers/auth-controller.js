import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
<<<<<<< HEAD

=======
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
// ???????
>>>>>>> hw05-avatars
import User from "../models/User.js";

import { HttpErrors } from "../utils/index.js";

import { controllerWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpErrors(409, "Email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpErrors(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpErrors(401, "Email or password invalid");
  }

  const { _id: id } = user;

  const payload = {
    id,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  await User.findByIdAndUpdate(id, { accessToken, refreshToken });

  res.json({
    accessToken,
    refreshToken,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });

  res.json({
    message: "Signout success",
  });
};

const refresh = async (req, res) => {
  try {
    const { id } = jwt.verify(req.body.refreshToken, JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
      throw HttpErrors(403);
    }

    const payload = {
      id,
    };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
    await User.findByIdAndUpdate(id, { accessToken, refreshToken });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch {
    throw HttpErrors(403);
  }
};

const updateSubscription = async (req, res) => {
  const { userId } = req.params;
  const result = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpErrors(404);
  }
  res.json(result);
};

export default {
  signup: controllerWrapper(signup),
  signin: controllerWrapper(signin),
  refresh: controllerWrapper(refresh),
  getCurrent: controllerWrapper(getCurrent),
  signout: controllerWrapper(signout),
  updateSubscription: controllerWrapper(updateSubscription),
};
