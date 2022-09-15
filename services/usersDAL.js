const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { ValidateUserByEmailError, AuthError } = require("../helpers");

const secret = process.env.SECRET;

const register = async ({ password, email, subscription }) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new ValidateUserByEmailError(
      `User with email ${email} already registered.`
    );
  }

  const newUser = new User({ password, email, subscription });
  await newUser.save();

  return newUser;
};

const login = async (password, email) => {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new AuthError("Email or password is wrong.");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new AuthError("Email or password is wrong.");
  }

  const token = await jwt.sign({ id: user._id, email }, secret, {
    expiresIn: "1d",
  });

  await User.updateOne({ _id: user._id }, { $set: { token } });

  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};

const authUser = async (id) => {
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new AuthError("Not authorized");
  }

  return user;
};

const logout = async (id) => {
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new AuthError("Email or password is wrong.");
  }

  await User.updateOne({ _id: id }, { $set: { token: null } });
};

const updateSubscription = async (id, subscription) => {
  console.log(subscription);
  const user = await User.updateOne({ _id: id }, { $set: { subscription } });

  if (!user) {
    throw new AuthError("Not authorized");
  }
};

module.exports = {
  register,
  login,
  authUser,
  logout,
  updateSubscription,
};
