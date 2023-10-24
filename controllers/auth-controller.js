import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import Jimp from "jimp";
import path from "path";
import fs from "fs/promises";

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
  const avatarURL = gravatar.url(email, {
    protocol: "https",
    s: "100",
  });

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

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

const changeAvatar = async (req, res) => {
  const { authorization } = req.headers;
  const [_, token] = authorization.split(" ");
  // change file name depends on user gmail
  const { path: oldPath, filename } = req.file;
  const [name, extension] = filename.split(".");
  const newFilename = `${name}_${req.user.email}.${extension}`;
  // avatar variables
  const avatarsPath = path.resolve("public", "avatars");
  const newPath = path.resolve(avatarsPath, newFilename);
  const avatarURL = path.join("avatars", newFilename);

  // changing path
  await fs.rename(oldPath, newPath);
  Jimp.read(newPath)
    .then((image) => {
      image.resize(250, 250).write(newPath);
    })
    .catch((err) => {
      throw err;
    });
  // update avatar in data base
  await User.findOneAndUpdate({ token }, { avatarURL });
  res.status(200).json({ avatarURL });
};

export default {
  register: ctrlErrorWrapper(register),
  login: ctrlErrorWrapper(login),
  getCurrent: ctrlErrorWrapper(getCurrent),
  logout: ctrlErrorWrapper(logout),
  changeAvatar: ctrlErrorWrapper(changeAvatar),
};
