import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

import HttpError from "../heplers/index.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import gravatar from "gravatar";
const generateAvatar = (email) => {
  const avatarURL = gravatar.url(email, {
    s: "200",
    r: "g",
    d: "identicon",
  });

  return avatarURL;
};

const { JWT_SECRET } = process.env;
const signup = async (req, res) => {
  const { email, password } = req.body;
  const url = generateAvatar(email);
  console.log(url);
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `${email} already in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl: url,
  });

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

const signin = async (req, res) => {
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
  });
};

const getCurrent = async (req, res) => {
  const { username, email } = req.user;

  res.json({
    username,
    email,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Signout success",
  });
};

const updateAvatar = async (req, res, next) => {
  const { path: tempPath, originalname } = req.file;

  // Обробка аватарки з використанням Jimp

  // Оновлення поля avatarURL користувача та збереження в базу даних
  const avatarURL = `/avatars/${originalname}`;
  // Отримайте ідентифікатор користувача, наприклад, з токену
  const { contactId } = req.params;

  try {
    // Оновіть поле avatarURL для користувача в базі даних
    await Contact.findByIdAndUpdate(contactId, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    console.error("Error updating avatarURL:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
