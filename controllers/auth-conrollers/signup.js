import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

import bcrypt from "bcryptjs";

import User from "../../models/user.js";

import {
  HttpError,
  sendEmail,
  createVerifyEmail,
} from "../../helpers/index.js";

const avatarPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL: gravatar.url(email),
      verificationToken,
    });

  const verifyEmail = createVerifyEmail({ email, verificationToken });

  sendEmail(verifyEmail);

  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  });
};

export default signup;
