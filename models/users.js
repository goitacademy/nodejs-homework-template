import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import Jimp from 'jimp';
import fs from 'fs/promises';
import jwt from 'jsonwebtoken';

import User from './../service/schemas/users.js';

import { serverAddress } from '../server.js';

const secret = 'GOIT2023';

const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (err) {
    console.log('Error getting user list: ', err);
    throw err;
  }
};

const getUser = async id => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log('Error getting user list: ', err);
    throw err;
  }
};

const logOutUser = async id => {
  try {
    const user = await User.findById(id);
    if (!user) return false;
    user.token = null;
    await user.save();
    return user;
  } catch (err) {
    console.log('Error getting user list: ', err);
    throw err;
  }
};

const addUser = async body => {
  const { email, password } = body;
  const userExist = await User.findOne({ email });
  if (userExist) return 409;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const userAvatar = gravatar.url(email, { s: '250' });
    const user = { ...body, password: hashedPassword, avatarURL: userAvatar };
    await User.create(user);
    return user;
  } catch (err) {
    console.log('Error adding new user: ', err);
    throw err;
  }
};

const loginUser = async body => {
  const { email, password } = body;
  const users = await User.find();
  const user = users.find(user => user.email === email);
  if (!user) return false;
  try {
    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) return false;

    const payload = {
      id: user.id,
      username: user.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    user.token = token;
    await user.save();
    return user;
  } catch (err) {
    console.log('Error adding new user: ', err);
    throw err;
  }
};

const patchUser = async (subscription, userId) => {
  const availableSubscriptions = User.schema.path('subscription').enumValues;
  if (!availableSubscriptions.includes(subscription)) {
    return 400;
  }
  try {
    return await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { subscription: subscription } },
      { new: true, select: 'email subscription' }
    );
  } catch (err) {
    console.error('An error occurred while updating subscription: ', err);
    throw err;
  }
};

const patchAvatar = async (filePath, userId) => {
  try {
    const localPath = `public/avatars/avatar-${userId}.jpg`;
    const serverPath = `${serverAddress}/${localPath.replace(/^public\//, '')}`;

    const lenna = await Jimp.read(filePath);
    await lenna.resize(250, 250).quality(60).writeAsync(localPath);

    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { avatarURL: localPath } },
      { new: true, select: 'avatarURL' }
    );

    await fs.unlink(filePath);
    return serverPath;
  } catch (err) {
    console.error('An error occurred while updating avatar: ', err);
    throw err;
  }
};

export const usersService = {
  getAllUsers,
  getUser,
  logOutUser,
  addUser,
  loginUser,
  patchUser,
  patchAvatar,
};

export default usersService;
