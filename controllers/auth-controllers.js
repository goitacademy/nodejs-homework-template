import User from "../models/user.js";
import path from "path";
import fs from "fs/promises";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import Jimp from "jimp";

dotenv.config();
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatar = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL: avatar,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
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
      email,
      subscription: user.subscription,
    },
  });
};

const avatarsPath = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
  // * завантажуємо, обробляємо і зберігаємо новий аватар
  const { path: oldPath, filename } = req.file;
  const image = await Jimp.read(oldPath);
  image.resize(250, 250);
  const newPath = path.join(avatarsPath, filename);
  image.write(newPath);
  fs.unlink(oldPath);
  let { _id, avatarURL } = req.user;

  // *отримуємо назву файла попереднього аватара (розвертаэмо масив, щоб назва файлу гарантовано була першим елементом масиву)

  const avatarsDirContent = await fs.readdir(path.join("public", "avatars"));
  const usersAvatarFileName = avatarURL.split("\\").reverse();
  const isCurrentAvatarExist = avatarsDirContent.includes(
    usersAvatarFileName[0]
  );

  // * перевіряємо папку на наявність аватара користувач, записуємо новий файл, видаляємо старий за наявності

  if (!isCurrentAvatarExist) {
    avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
  } else {
    fs.unlink(path.resolve("public", avatarURL));
    avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
  }
  res.json({
    avatarURL,
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json();
};

const updateUsersSubscription = async (req, res) => {
  const { _id } = req.user;
  const { ...query } = req.query;
  await User.findByIdAndUpdate(_id, { ...query });
  res.json();
};

export default {
  register: ctrlWrapper(register),
  signin: ctrlWrapper(login),
  updateAvatar: ctrlWrapper(updateAvatar),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUsersSubscription: ctrlWrapper(updateUsersSubscription),
};
