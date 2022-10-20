const jwt = require("jsonwebtoken");
const { User } = require("../db/usersModel");
const { NoAuthorizedError, AuthConflictError } = require("../helpers/errors");
require("dotenv").config();
const secret = process.env.SECRET;

const patchUserSubscription = async (id, subscription) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NoAuthorizedError("Not authorized");
  }
  await User.findByIdAndUpdate(id, { subscription });
  const userFind = await User.findById(id);
  return userFind;
};

const registration = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new AuthConflictError("Email is already in use");
  }
  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();
  const userFind = await User.findOne({ email }, { email: 1, subscription: 1 });
  return userFind;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.validPassword(password))) {
    throw new NoAuthorizedError("Email or password is wrong");
  }
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  await User.findOneAndUpdate({ email }, { token });
  const userFind = await User.findOne({ email }, { email: 1, subscription: 1 });
  return { token, userFind };
};

const logout = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NoAuthorizedError("Not authorized");
  }
  await User.findByIdAndUpdate(id, { token: null });
};

const currentUser = async (id) => {
  const user = await User.findOne({ _id: id }, { email: 1, subscription: 1 });
  if (!user) {
    throw new NoAuthorizedError("Not authorized");
  }
  return user;
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  patchUserSubscription,
};
