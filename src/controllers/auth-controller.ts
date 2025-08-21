import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import "dotenv/config";
import jimp from "jimp";
import type { ObjectId } from "mongoose";

import User from "../models/User";
import { ctrlContactWrapper } from "../decorators/index";
import { HttpError, sendEmail } from "../helpers/index";
import { IUser, UserDocument } from "../types/index";
import { isDev } from "../utils/currEnv";

const avatarsPath = path.resolve(isDev ? "src" : "dist", "public", "avatars");

const { JWT_SECRET_KEY, BASE_URL } = process.env;

const verifyEnvelop = (email: string, verificationToken: string) => {
  return {
    to: email,
    subject: "Veification email",
    html: `<a target="_blank" href="${BASE_URL}/verify/${verificationToken}">please verify your email by clicking the following link</a>`,
  };
};

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const avatarURL = gravatar.url(email);

  if (user) {
    throw HttpError(409, "Such email is exist");
  }

  const verificationToken = nanoid();
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
    avatarURL,
  });

  await sendEmail(verifyEnvelop(email, verificationToken));

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verifyEmail = async (req: Request, res: Response) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.updateOne(
    { verificationToken: user.verificationToken },
    {
      verify: true,
      verificationToken: "",
    }
  );

  res.json({
    message: "Verification successful",
  });
};

const repeadVerify = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmail(verifyEnvelop(email, user.verificationToken));

  res.json({
    message: "Verification email sent",
  });
};

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: UserDocument | null = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Your email wasn't verified");
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload: { id: ObjectId } = {
    id: user._id as ObjectId,
  };

  const token = jsonwebtoken.sign(payload, JWT_SECRET_KEY!, {
    expiresIn: "24h",
  });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const current = async (req: Request & IUser, res: Response) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

const signout = async (req: Request & IUser, res: Response) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const updateUserSubscr = async (
  req: Request & IUser,
  res: Response,
  next: NextFunction
) => {
  const { subscription } = req.body;
  const { token } = req.user;

  const resp: any = jsonwebtoken.verify(token, JWT_SECRET_KEY!);

  const updateUser = await User.findByIdAndUpdate(
    resp.id,
    { subscription },
    { new: true, runValidators: true }
  );

  if (!updateUser) {
    throw HttpError(404, "User not found");
  }

  res.status(200).json(updateUser);
};

const updateAvatar = async (
  req: Request & IUser,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;

  const { path: oldPath, filename } = req?.file as Express.Multer.File;
  const newPath = path.join(avatarsPath, filename);

  (await jimp.read(oldPath)).resize(250, 250).write(oldPath);

  await fs.rename(oldPath, newPath);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

export default {
  signup: ctrlContactWrapper(signup),
  signin: ctrlContactWrapper(signin),
  verifyEmail: ctrlContactWrapper(verifyEmail),
  repeadVerify: ctrlContactWrapper(repeadVerify),
  current: ctrlContactWrapper(current),
  signout: ctrlContactWrapper(signout),
  subscription: ctrlContactWrapper(updateUserSubscr),
  updateAvatar: ctrlContactWrapper(updateAvatar),
};
