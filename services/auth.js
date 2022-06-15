const { User } = require("../models");

const findUser = async ({ email }) => {
  return await User.findOne({ email });
};

const createUser = async (email, password) => {
  return await User.create({ email, password });
};

module.exports = { findUser, createUser };
