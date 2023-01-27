import bcrypt from 'bcrypt'; // hash password
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

export const updateAvatar = async (userId, filename) => {
  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { avatarURL: `/avatars/${filename}` },
    { new: true, fields: { email: 1, avatarURL: 1 } }
  );

  return updatedUser;
};
