import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs/promises';
import gravatar from 'gravatar';
import Jimp from 'jimp';
import 'dotenv/config';

import User from '../models/User.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

// ============================================================

const { JWT_SECRET } = process.env;
const avatarsPath = path.resolve('public', 'avatars');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
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
    throw HttpError(401, 'Email or password is wrong');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email });

  res.json({
    email,
    subscription: user.subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json({ message: 'Logout success' });
};

const changeSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { subscription });

  res.json({ message: 'Subscription change successful' });
};

const changeAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, 'File not uploaded');
  }
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;

  const avatar = await Jimp.read(oldPath);
  avatar.resize(250, 250);
  avatar.write(oldPath);

  const newFilename = `${_id}_${filename}`;
  const newPath = path.join(avatarsPath, newFilename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join('avatars', newFilename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  changeSubscription: ctrlWrapper(changeSubscription),
  changeAvatar: ctrlWrapper(changeAvatar),
};
