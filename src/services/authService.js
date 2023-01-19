import bcrypt from 'bcrypt'; // hash password
import jwt from 'jsonwebtoken'; // JWT
import { User } from '../models/userModel.js';

export const signup = async ({ email, password, subscription }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    subscription,
  });

  return {
    email: newUser.email,
    subscription: newUser.subscription,
  };
};

export const login = async (email, password) => {
  const user = await User.findOne(
    { email },
    { email: 1, subscription: 1, password: 1 }
  );

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  await User.findOneAndUpdate(user._id, { token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const logout = async userId => {
  const { email, subscription } = await User.findOneAndUpdate(
    { _id: userId },
    { token: null },
    { new: true }
  );

  return { email, subscription };
};

export const getCurrentUser = async userId => {
  const { email, subscription } = await User.findOne(
    { _id: userId },
    { email: 1, subscription: 1 }
  );

  return { email, subscription };
};

export const updateSubscription = async (userId, subscription) => {
  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { subscription },
    { new: true }
  );

  return {
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  };
};
