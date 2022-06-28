const { User } = require("../models");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const { SECRET_KEY } = process.env;

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, `User with email=${email} not found`);
  }
  const passCompare = bcrypt.compare(password, user.password);
  if (!passCompare) {
    throw createError(401, "Password wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  return { token };
};
module.exports = loginUser;
