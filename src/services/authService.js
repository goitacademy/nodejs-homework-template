import bcrypt from 'bcrypt'; // hash password
import jwt from 'jsonwebtoken'; // JWT
import { User } from '../models/userModel.js';

export const signup = async ({ email, password, subscription }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    email,
    password: hashedPassword,
    subscription,
  });

  const newUser = {
    id: createdUser._id,
    email: createdUser.email,
    subscription: createdUser.subscription,
  };

  return newUser;
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return {
    token: token,
    user: {
      id: user._id,
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const logout = async (email, password) => {};

export const getCurrentUser = async (email, password) => {};

export const updateSubscription = async (email, password) => {};
