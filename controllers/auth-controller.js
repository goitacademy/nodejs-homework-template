import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import { ctrlWrapper } from '../decorators/index.js';
import { HttpError } from '../helpers/index.js';

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const searchedUser = await User.findOne({ email });
  if (searchedUser) {
    throw HttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const errorMessage = 'Email or password is wrong';
  const { email, password } = req.body;
  const searchedUser = await User.findOne({ email });
  if (!searchedUser) {
    throw HttpError(401, errorMessage);
  }

  const passwordCompare = await bcrypt.compare(password, searchedUser.password);
  if (!passwordCompare) {
    throw HttpError(401, errorMessage);
  }

  const payload = {
    id: searchedUser._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });
  await User.findByIdAndUpdate(searchedUser._id, { token });

  res.json({
    token: token,
    user: {
      email: searchedUser.email,
      subscription: searchedUser.subscription,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json();
};

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
};
