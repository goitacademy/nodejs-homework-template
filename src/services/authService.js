const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { NotAuthorizedError, UserConflictError } = require("../helpers/errors");

const registration = async (email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new UserConflictError(`User with email: ${email} already exists`);
  }

  const user = new User({ email, password });
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError(`No user with email ${email} was found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Password is incorrect`);
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  user.token = token;
  await user.save();
  return { user, token };
};
const logout = async (userId) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotAuthorizedError(`No user with email ${email} was found`);
  }

  user.token = "";
  await user.save();
};
const current = async (userId) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotAuthorizedError(`No user with email ${email} was found`);
  }
  return user;
};

module.exports = {
  registration,
  login,
  logout,
  current,
};
