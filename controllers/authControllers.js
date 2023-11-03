import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

import HttpError from "../heplers/index.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import gravatar from "gravatar";
import sendEmail from "../heplers/sendEmail.js";
import { nanoid } from "nanoid";

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
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl: url,
    verificationCode: verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationCode}">Click to verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

const verify = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw HttpError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({
    message: "Verify success",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationCode}">Click to verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send",
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
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
