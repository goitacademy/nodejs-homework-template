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
  const user = await User.create({ email, password: hashPassword });
  res.status(201).json({ user });
};

const login = async (req, res, next) => {};

const logout = async (req, res, next) => {};

const refresh = async (req, res, next) => {};

module.exports = { register: ctrlWrapper(register), login, logout, refresh };
