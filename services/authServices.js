const { User } = require("../models/userModel");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registration = async (email, password) => {
  const user = new User({ email, password });
  await user.save();
};
const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || (await !bcrypt.compare(password, user.password))) {
    throw new Unauthorized("Email or password is wrong");
  }
  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );
  user.token = token;
  await User.findByIdAndUpdate(user._id, user);
  return token;
};
module.exports = {
  registration,
  login,
};
