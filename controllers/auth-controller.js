import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import Jimp from "jimp";
import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
// import "dotenv/config";

import { HttpError, sendEmailNM, sendEmailSG } from "../helpers/index.js";
import { UserDB } from "../models/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET, BASE_URL } = process.env;
const avatarsDir = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserDB.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await UserDB.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify e-mail",
    // text: "Hello",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  // await sendEmailSG(verifyEmail);
  await sendEmailNM(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserDB.findOne({ email });
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

  // const { JWT_SECRET } = process.env;
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await UserDB.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await UserDB.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};

const subscriptionChange = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const result = await UserDB.findByIdAndUpdate(_id, { subscription });
  if (!result) throw HttpError(404, "Not found");

  const { email, subscription: subscriptionResult } = result;

  res.status(200).json({
    email,
    subscription: subscriptionResult,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.resolve(avatarsDir, fileName);

  Jimp.read(tempUpload, (err, img) => {
    if (err) throw HttpError(404, err);
    img.contain(250, 250).write(resultUpload);
  });

  await fs.unlink(tempUpload);

  const avatarURL = path.join("avatars", fileName);
  await UserDB.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  subscriptionChange: ctrlWrapper(subscriptionChange),
  updateAvatar: ctrlWrapper(updateAvatar),
};
