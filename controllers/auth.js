import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/user.js";
import { HttpError } from "../helpers/HttpError.js";
import gravatar from "gravatar";
import path from "path";
import { rename } from "node:fs/promises";
import { adjustingAvatar } from "../helpers/adjustAvatar.js";

const { SECRET_KEY } = process.env;

const avatarsDir = path.resolve("public/avatars");

export const register = async (req, res, next) => {
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

    const newUser = await User.create({
      ...req.body,
      password: passwordHash,
      avatarURL,
    });

    generateToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) throw HttpError(401, "Email or password is wrong");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw HttpError(401, "Email or password is wrong");

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    // add a token to the user
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

export const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send();
};

export async function updateSubscription(req, res, next) {
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

// Update a User's Avatar
export const updateAvatar = async (req, res, next) => {
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

// export default login;
