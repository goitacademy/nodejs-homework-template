const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const createError = require("../helpers/createError");

require("dotenv").config();

const register = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const userNew = await User.create({
    email,
    password: hash,
  });

  return userNew;
};

const login = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, "Email or password is wrong");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw createError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  const userAfterTokenUpdate = await User.findByIdAndUpdate(
    user.id,
    { token },
    { new: true }
  );

  return userAfterTokenUpdate;
};

const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: "" });
};

module.exports = {
  register,
  login,
  logout,
};
