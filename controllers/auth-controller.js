import User from "../models/user.js";

import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from "jimp";

import { HttpError, sendEmail, createVerifyEmail } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const { JWT_SECRET, BASE_URL } = process.env;
const avatarsPath = path.resolve("public", "avatars");
const tempPatch = path.resolve("tmp");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const avatar = gravatar.url(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatar,
    verificationToken,
  });
  const verifyEmail = createVerifyEmail({ email, verificationToken });
  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "null",
  });

  res.status(200).json({ message: "Verification successful" });
};
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne(email);
  if (!user) {
    throw HttpError(404, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = createVerifyEmail({
    email,
    verificationToken: user.verificationToken,
  });
  await sendEmail(verifyEmail);

  res.json({ message: "Verification email sent" });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(401, "Email not verify");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findOneAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { subscription, email } = req.user;
  res.json({ email, subscription });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findOneAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "_" });
};
const changeAvatar = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  await Jimp.read(oldPath)
    .then((avatar) => {
      return avatar
        .resize(250, 250) // resize
        .write(oldPath); // save
    })
    .catch((err) => {
      console.error(err);
    });
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatar = path.join("avatars", filename);
  const result = await User.findByIdAndUpdate(
    owner,
    { avatarURL: avatar },
    {
      new: true,
    }
  );
  res.status(201).json(result.avatarURL);
};

export default {
  signup: ctrlWrapper(signup),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  changeAvatar: ctrlWrapper(changeAvatar),
};
