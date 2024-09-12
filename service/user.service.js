const User = require("../models/user.model");

const findUserById = async (id) => await User.findOne({ _id: id });
const findUserByEmail = async (email) => await User.findOne({ email });
const findUserByToken = async (token) => await User.findOne({ token });
const createUser = async (email, password) =>
  await new User({ email, password }).save();
const updateKeyForUser = async (field, id) => {
  await User.findByIdAndUpdate({ _id: id }, field, { new: true });
};

module.exports = {
  findUserById,
  findUserByEmail,
  findUserByToken,
  createUser,
  updateKeyForUser,
};
