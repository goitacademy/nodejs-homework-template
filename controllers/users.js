import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import Jimp from "jimp";

import { HttpError } from "../helpers/HttpError.js";
import { controllerWrapper } from "../decorators/index.js";
import { User } from "../models/User.js";
import { resizeAvatar } from "../middlewares/index.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use")
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL: gravatar.url(email, { s: "200"}) });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    }
  })
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong")
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    throw HttpError(401, "Email or password is wrong")
  }
  const payload = {
    id: user._id,

  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });

  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription
    }
  })
};

const updateAvatar = async (req, res) => {
  const avatarsPath = path.resolve("public", "avatars");
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  fs.rename(oldPath, newPath);
  const pathToAvatar = path.join("avatars", filename);
  //resizeAvatar(path);
  await User.findByIdAndUpdate(req.user._id, {avatarURL: pathToAvatar});
  res.status(200).json({
    avatarURL: pathToAvatar,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription
  })
}
const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: "" });
  res.status(204).json();
}
export default {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  updateAvatar: controllerWrapper(updateAvatar),
};
