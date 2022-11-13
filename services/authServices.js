const { User } = require("../models/userModel");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registration = async (email, password) => {
  const user = new User({ email, password });
  await user.save();
};
const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Conflict("wrong password");
  }
  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );

  return token;
};
module.exports = {
  registration,
  login,
};
