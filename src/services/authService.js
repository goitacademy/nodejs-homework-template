import bcrypt from 'bcrypt'; // hash password
import fs from 'fs/promises'; // working with files
import gravatar from 'gravatar'; // making avatar
import Jimp from 'jimp'; // image update
import jwt from 'jsonwebtoken'; // JWT
import { User } from '../models/userModel.js';

export const signup = async newUserData => {
  const newUser = await User.create(newUserData);

  return {
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  };
};

export const login = async (email, password) => {
  const user = await User.findOne(
    { email },
    { email: 1, subscription: 1, password: 1, avatarURL: 1 }
  );

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  }); // token expiration in 24hours
  await User.findOneAndUpdate(user._id, { token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  };
};

export const logout = async userId => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { token: null },
    { new: true, fields: { email: 1, subscription: 1 } }
  );

  return user;
};

export const getCurrentUser = async userId => {
  const currentUser = await User.findOne(
    { _id: userId },
    { email: 1, subscription: 1, avatarURL: 1 }
  );

  return currentUser;
};

export const updateSubscription = async (userId, subscription) => {
  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { subscription },
    { new: true, fields: { email: 1, subscription: 1 } }
  );

  return updatedUser;
};

export const updateAvatar = async data => {
  const { userId, filename, tmpPath, publicPath } = data;
  const file = await Jimp.read(tmpPath); // find initial file
  file.cover(250, 250).resize(250, Jimp.AUTO).quality(60).write(publicPath); // change initial file and redirect to public folder

  await fs.unlink(tmpPath); // remove initial file from tmp folder

  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { avatarURL: `/avatars/${filename}` },
    { new: true, fields: { email: 1, avatarURL: 1 } }
  );

  return updatedUser;
};
