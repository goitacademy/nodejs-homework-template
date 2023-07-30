import bcrypt from 'bcryptjs';

import User from '../models/user.js';

import { ctrlWrapper } from '../decorators/index.js';
import { HttpError } from '../helpers/index.js';

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

  const token = 'fdfsdfdgdgdgdvdvdvfdbdfbfdbdf';

  res.json({
    token: token,
    user: {
      email: searchedUser.email,
      subscription: searchedUser.subscription,
    },
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
