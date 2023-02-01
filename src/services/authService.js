import bcrypt from 'bcrypt'; // hash password
import createError from 'http-errors';
import jwt from 'jsonwebtoken'; // JWT
import { User } from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../helpers/sendEmail.js';

export const signup = async newUserData => {
  const verificationToken = uuidv4();

  const newUser = await User.create({ ...newUserData, verificationToken });

  await sendEmail({
    type: 'verification',
    email: newUser.email,
    verificationToken,
  });

  return {
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  };
};

export const verifyEmail = async verificationToken => {
  const user = await User.findOne(
    { verificationToken },
    { email: 1, verificationToken: 1, verify: 1 }
  );

  if (!user || user.verify) return null;

  user.verificationToken = null;
  user.verify = true;
  await user.save();

  await sendEmail({ type: 'registration', email: user.email });

  return user;
};

export const resendEmail = async email => {
  const verificationToken = uuidv4();

  const user = await User.findOne(
    { email },
    { email: 1, verificationToken: 1, verify: 1 }
  );

  if (!user) return null;
  if (user.verify) {
    throw new createError(400, `Verification has already been passed`);
  }

  user.verificationToken = verificationToken;
  await user.save();

  await sendEmail({
    type: 'verification',
    email: user.email,
    verificationToken,
  });

  return { email };
};

export const login = async (email, password) => {
  const user = await User.findOne(
    { email },
    { email: 1, subscription: 1, password: 1, verify: 1, avatarURL: 1 }
  );

  if (!user) return null;
  if (!user.verify) throw new createError(401, `Email is not verified`);

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
