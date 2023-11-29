const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email in use");
  }

  const newUser = await User.create({ email, password });
  return newUser;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Email or password is wrong");
  }

  const token = jwt.sign({ userId: user._id }, "your-secret-key", {
    expiresIn: "1h",
  });
  user.token = token;
  await user.save();

  return { token, user };
};

const logout = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Not authorized");
  }

  user.token = null;
  await user.save();
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Not authorized");
  }

  return user;
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
};
