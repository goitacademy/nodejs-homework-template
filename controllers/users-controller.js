import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from "jimp";
import User from "../models/User.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";
import "dotenv/config";
const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatars");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const avatar = gravatar.url(email, { s: "200", r: "pg", d: "retro" });

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    avatarURL: avatar,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      avatarURL: avatar,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res, next) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({
    email,
    subscription,
    avatarURL,
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: "" }, { new: true });

  if (!user) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  res.status(204).end();
};

const resizingImage = async (
  inputPath,
  outputPath,
  width,
  height = Jimp.AUTO
) => {
  try {
    const image = await Jimp.read(inputPath);
    await image.resize(width, height);
    await image.writeAsync(outputPath);
  } catch (error) {
    console.log(error);
  }
};

const changeAvatar = async (req, res, next) => {
  const { _id } = req.user;

  if (!req.file || !req) {
    throw HttpError(400, "Missing new avatar file");
  }
  const { path: oldPath, filename } = req.file;

  const newPath = path.join(avatarsPath, filename);

  await fs.rename(oldPath, newPath);
  await resizingImage(newPath, newPath, 250, 250);

  const result = await User.findByIdAndUpdate(_id, {
    avatarURL: `/avatars/${filename}`,
  });

  res.status(201).json({
    avatarURL: `/avatars/${filename}`,
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  changeAvatar: ctrlWrapper(changeAvatar),
};
