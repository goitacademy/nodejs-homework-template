import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import "dotenv/config";
import { User } from "../models/user.js";
import { HttpError } from "../helpers/HttpError.js";
import gravatar from "gravatar";
import path from "path";
import { rename } from "node:fs/promises";
import { adjustingAvatar } from "../helpers/adjustAvatar.js";
import { sendEmail } from "../helpers/sendEmail.js";
import { ctrlWrapper } from "../decorators/ctrlWrapper.js";

const { SECRET_KEY } = process.env;

const avatarsDir = path.resolve("public/avatars");

// Registration
const register = async (req, res, next) => {
  const { password, email } = req.body;

  const generateToken = async (newUser, statusCode, res) => {
    const user = await User.findOne({ email });

    if (!user) throw HttpError(401, "Email or password is wrong");

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(statusCode).json({
      status: "success",
      code: statusCode,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
        token,
        avatarURL: newUser.avatarURL,
      },
    });
  };

  try {
    const user = await User.findOne({ email }).exec();

    if (user) throw HttpError(409, "Email in use");

    const passwordHash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    const newUser = await User.create({
      ...req.body,
      password: passwordHash,
      avatarURL,
      verificationToken,
    });

    await sendEmail(email, verificationToken);

    generateToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

// Verify Email
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) throw HttpError(404, "User Not Found");

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verification successful",
  });
};

// Resend Email with Verification Token
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, "Email not found");

  if (user.verify) throw HttpError(400, "Verification has already been passed");

  await sendEmail(email, user.verificationToken);

  res.json({
    message: "Verification email sent",
  });
};

// Login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) throw HttpError(401, "Email or password is wrong");
    if (!user.verify) throw HttpError(401, "Email is not verified!");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw HttpError(401, "Email or password is wrong");

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    // add token to the user
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

// Check current user's token
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

// Logout
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send();
};

async function updateSubscription(req, res, next) {
  const { _id: user } = req.user;

  const userSubscription = await User.findByIdAndUpdate(user, req.body, {
    new: true,
  });

  if (!userSubscription) return next();

  const { email, subscription } = userSubscription;

  res.status(200).json({
    email,
    subscription,
  });
}

// Update User's Avatar
const updateAvatar = async (req, res, next) => {
  const { _id: user } = req.user;

  if (req.file === undefined)
    throw HttpError(404, "Image was not found, check form-data values");
  const { path: tempUpload, originalname } = req.file;

  const filename = `${user}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await adjustingAvatar(tempUpload);
  await rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(user, { avatarURL });

  res.json({ avatarURL });
};

export default {
  signup: ctrlWrapper(register),
  verify: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  signin: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
