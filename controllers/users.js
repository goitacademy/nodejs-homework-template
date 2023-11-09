const { User } = require('../models/user');
const { HttpError, ctrlWrapper } = require('../utils');
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const isUser = Boolean(await User.findOne({ email }));
  if (isUser) {
    throw HttpError({ status: 409, message: 'Email in use' });
  }
  const hashPassword = bcrypt.hashSync(password, 8);
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
  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res, next) => {
  // const { id: _id } = req;
  // console.log(_id);
  // const user = await User.findOne({ _id });
  // console.log(user);
  // res.status(204).json();
};

const refresh = async (req, res, next) => {};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  refresh: ctrlWrapper(refresh),
};
