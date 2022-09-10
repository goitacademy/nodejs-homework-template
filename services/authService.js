const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { updateToken } = require("./registrationService");

const login = async (username, password) => {
  const user = await User.findOne({ username: username });
  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );
  const updateUser = await User.findOne({ _id: user._id });
  const data = await updateToken(user._id, token);
  return data;
};

module.exports = {
  login,
};
