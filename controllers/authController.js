import User from '../models/user.js';
import { controllerWrapper } from '../decorators/index.js';
import { HttpError } from '../helpers/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import gravatar from 'gravatar';

import fs from 'fs/promises';
import path from 'path';
import Jimp from 'jimp';

// ####################################################

const emailErrorMsg = 'This email is already linked to an existing account';
const authErrorMsg = 'Invalid email or password';

// ####################################################

// Create an account
const register = async (req, res) => {
  const { email, password } = req.body;

  // Check if a user with this email already exists:
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, emailErrorMsg);

  const hashedPass = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email, { size: '400' });
  const credentials = { ...req.body, password: hashedPass, avatarUrl };

  const newUser = await User.create(credentials);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarUrl: newUser.avatarUrl,
  });
};

// Log in
const login = async (req, res) => {
  const { email: reqEmail, password: reqPass } = req.body;

  const user = await User.findOne({ email: reqEmail });
  if (!user) throw HttpError(401, authErrorMsg);

  const { email, subscription, password, id } = user;

  const isPasswordValid = await bcrypt.compare(reqPass, password); // As of bcryptjs 2.4.0, 'compare' returns a promise if callback (passed as the third argument) is omitted
  if (!isPasswordValid) throw HttpError(401, 'in isPasswordValid');

  const payload = { id };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: '23h' });
  await User.findByIdAndUpdate(id, { token });

  res.json({ token, user: { email, subscription } });
};

// Log out
const logout = async (req, res) => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: '' });

  res.json({ message: 'Signed out successfully' });
};

// Check if user is logged in
const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

// Update subscription type
const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id: id } = req.user;

  await User.findByIdAndUpdate(id, { subscription });

  let firstCharacter = subscription.charAt(0);
  firstCharacter = firstCharacter.toUpperCase();
  let capitalizedString = firstCharacter + subscription.slice(1);

  res.json({
    message: `Subscription has been updated to '${capitalizedString}'`,
  });
};

// Update avatar
const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: oldPath, filename } = req.file;
  const avatarPath = path.resolve('public', 'avatars');
  const newPath = path.join(avatarPath, filename);

  Jimp.read(oldPath)
    .then((image) => {
      return image.resize(250, 250).write(newPath);
    })
    .catch((err) => {
      console.error(err);
    });

  await fs.unlink(oldPath);

  const avatar = path.join('avatars', filename); // 'public' is omitted because a middleware in app.js already tells Express to look for static files in the 'public' folder

  await User.findByIdAndUpdate(
    { _id: _id },
    { avatarUrl: avatar },
    { new: true }
  );
  res.status(200).json({ avatarUrl: avatar });
};
// ####################################################

export default {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  getCurrent: controllerWrapper(getCurrent),
  updateSubscription: controllerWrapper(updateSubscription),
  updateAvatar: controllerWrapper(updateAvatar),
};
