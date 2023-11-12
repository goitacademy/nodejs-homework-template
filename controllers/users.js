const { User } = require('../models/user');
const { HttpError, ctrlWrapper } = require('../utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const isUser = Boolean(await User.findOne({ email }));
  if (isUser) {
    throw HttpError({ status: 409, message: 'Email in use' });
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  const response = await User.create({ email, password: hashPassword });
  res.status(201).json({
    user: {
      email: response.email,
      subscription: response.subscription,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isValidPassword = bcrypt.compareSync(password, user?.password ?? '');
  if (!isValidPassword || !user) {
    throw HttpError({ status: 401, message: 'Email or password is wrong' });
  }
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '30d' });
  const response = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );
  res.status(200).json({
    token: response.token,
    user: {
      email: response.email,
      subscription: response.subscription,
    },
  });
};

const logout = async (req, res, next) => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: null }, { new: true });
  res.status(204).json();
};

const refresh = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const updateSubscription = async (req, res, next) => {
  const { _id: id } = req.user;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(user);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  refresh: ctrlWrapper(refresh),
  updateSubscription: ctrlWrapper(updateSubscription),
};
