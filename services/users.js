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

const findUserAndUpdate = async (id, token) => {
  return await User.findByIdAndUpdate(id, token);
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  findUserAndUpdate,
};
