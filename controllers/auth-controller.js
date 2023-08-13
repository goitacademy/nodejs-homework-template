import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs/promises";
import gravatar from "gravatar";
import Jimp from "jimp";
import "dotenv/config";

import User from "../models/user.js";

import HttpError from "../helpers/HttpError.js";

import { ctrlWrapper } from "../decorators/index.js";

const { JWt_SECRET } = process.env;

const singUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exists");
  }

  const url = gravatar.url(email, { s: "250", r: "x", d: "retro" });
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: url,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const singIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password invalid");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password invalid");

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWt_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
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

const singOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json(console.log("Singout success"));
};

const updateSubscriptionStatus = async (req, res) => {
  const { _id } = req.user;
  const updateSubscription = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!updateSubscription) {
    throw HttpError(404, `User with id=${_id} is not found`);
  }
  res.json(updateSubscription);
};

const avatarPath = path.resolve("public", "avatars");

const updateAvatarStatus = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const outputPath = path.resolve("temp", filename);
  try {
    const image = await Jimp.read(outputPath);
    await image.resize(250, 250);
    await image.writeAsync(outputPath);
    req.file.path = outputPath;
  } catch (error) {
    throw HttpError(400, `${error.message}`);
  }
  console.log(req.file);
  console.log(avatarPath);
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const url = path.join("avatars", filename);

  const { _id } = req.user;

  const updateAvatar = await User.findByIdAndUpdate(
    _id,
    { avatarURL: url },
    {
      new: true,
    }
  );
  if (!updateAvatar) {
    throw HttpError(404, `User with id=${_id} is not found`);
  }
  res.json(updateAvatar);
};

export default {
  singUp: ctrlWrapper(singUp),
  singIn: ctrlWrapper(singIn),
  getCurrent: ctrlWrapper(getCurrent),
  singOut: ctrlWrapper(singOut),
  updateSubscriptionStatus: ctrlWrapper(updateSubscriptionStatus),
  updateAvatarStatus: ctrlWrapper(updateAvatarStatus),
};
