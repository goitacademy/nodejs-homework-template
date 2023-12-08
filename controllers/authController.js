import path from "path";
import fs from "fs/promises";
import gravatar from "gravatar";
import Jimp from "jimp";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import { ctrWrapper } from "../decorators/index.js";
import User from "../models/users.js";

const { JWT_SECRET } = process.env;

const postersPath = path.resolve("public", "avatars");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const duplicateCheck = await User.findOne({ email });
  if (duplicateCheck) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, { d: "mp" });

  const hashPassword = await bcrypt.hash(password, 10);
  const data = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      email: data.email,
      subscription: data.subscription,
      avatarURL: data.avatarURL,
    },
  });
};

const signIn = async (req, res) => {
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

  const { _id: id } = user;

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "16h" });
  await User.findByIdAndUpdate(id, { token });

  res.json({
    token: token,
    user: {
      email: email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "No Content" });
};

const current = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const subscription = async (req, res) => {
  const { _id } = req.user;

  const data = await User.findByIdAndUpdate(_id, req.body, { new: true });

  res.json(data);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(postersPath, filename);

  await fs.rename(oldPath, newPath);

  let avatar = await Jimp.read(newPath);
  avatar.resize(250, 250).quality(100).write(newPath);

  const avatarPath = path.join("avatars", filename);
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { avatarURL: avatarPath },
    { new: true, runValidators: true }
  );

  res.status(200).json({ avatarURL: updatedUser.avatarURL });
};

export default {
  signUp: ctrWrapper(signUp),
  signIn: ctrWrapper(signIn),
  logout: ctrWrapper(logout),
  current: ctrWrapper(current),
  subscription: ctrWrapper(subscription),
  updateAvatar: ctrWrapper(updateAvatar),
};