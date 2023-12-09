import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs/promises";
import "dotenv/config";
import Jimp from "jimp";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import { HttpError, htmlForValidateEmail, sendMail } from "../helpers/index.js";

const { JWT_SECRET } = process.env;
const avatarsPath = path.resolve("public", "avatars");

export const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const verificationToken = nanoid();
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "250", r: "g", d: "retro" }, true);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  sendMail({
    to: email,
    subject: "Email verification",
    text: "Verify yor email",
    html: htmlForValidateEmail(verificationToken),
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  });
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

export const signout = async (req, res, next) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, { token: "" });
  if (!result) {
    throw HttpError(401, "Not authorized");
  }
  res.status(204);
};

export const current = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ email: user.email, subscription: user.subscription });
};

export const updateSubscription = async (req, res, next) => {
  const subscription = req.body.subscription;
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res
    .status(200)
    .json({ email: result.email, subscription: result.subscription });
};

export const updateAvatar = async (req, res, next) => {
  const id = req.user._id;

  if (!req.file) {
    throw HttpError(400, "Upload avatar file");
  }
  const { path: tempPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  const photo = await Jimp.read(tempPath);
  photo.resize(250, 250).write(newPath);
  fs.unlink(tempPath);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(id, { avatarURL });

  res.status(200).json({ avatarURL });
};

export const verifyEmail = async (req, res, next) => {
  const verificationToken = req.params.verificationToken;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.status(200).json({ message: "Verification successful" });
};

export const resendVerifyMail = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  sendMail({
    to: email,
    subject: "Email verification",
    text: "Verify yor email",
    html: htmlForValidateEmail(user.verificationToken),
  });

  res.status(200).json({ message: "Verification email sent" });
};
