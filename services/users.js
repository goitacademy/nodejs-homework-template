const { User } = require("../models");

const findUserByEmail = async ({ email }) => {
  return await User.findOne({ email });
};

const createUser = async (email, password) => {
  return await User.create({ email, password });
};

const findUserById = async (id) => {
  return await User.findById(id);
};
module.exports = { findUserByEmail, createUser, findUserById };
