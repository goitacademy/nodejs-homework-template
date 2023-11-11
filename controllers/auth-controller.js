/** @format */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";

import User from "../models/User.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  let avatarUrl;

  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);
    await fs.rename(oldPath, newPath);
    avatarUrl = path.join("avatars", filename);
  } else {
    const options = {
      s: "200",
      r: "pg",
      d: "mm",
    };
    avatarUrl = gravatar.url(email, options, true);
  }

  const newUser = await User.create({
    ...req.body,
    avatarUrl,
    password: hashPassword,
  });

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    email: user.email,
    subscription: user.subscription,
  });
};

const getCurrent = async (req, res) => {
  const { subscription, email } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.sendStatus(204);
};

const updateAvatarUser = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) {
    throw HttpError(400, `File required`);
  }
  const { path: oldPath, filename } = req.file;

  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarUrl = path.join("avatars", filename);

  const updatedUser = { ...req.body, avatarUrl };
  const result = await User.findByIdAndUpdate(_id, updatedUser);
  if (!result) {
    throw HttpError(404, `User with id=${_id} not found`);
  }

  res.json({ avatarUrl: result.avatarUrl });
};

export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatarUser: ctrlWrapper(updateAvatarUser),
};
