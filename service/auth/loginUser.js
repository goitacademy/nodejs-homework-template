const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Unauthorized } = require("http-errors");
const { User } = require("../../models/userModel");
require("dotenv").config();

const USER_SECRET_KEY = process.env.USER_SECRET_KEY;

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!user || !passwordCompare) {
    throw new Unauthorized("Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, USER_SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

module.exports = loginUser;
