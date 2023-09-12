const User = require("../models/user.model");

const createUser = async (email, password) => {
  const newUser = new User({ email });
  newUser.setPassword(password);
  return newUser.save();
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const getUserById = async (id) => {
  return User.findOne({ _id: id });
};

const saveToken = (id, token) => {
  return User.findByIdAndUpdate(
    { _id: id },
    { $set: { token } },
    { new: true }
  );
};

const removeToken = (id) => {
  return User.findByIdAndUpdate(
    { _id: id },
    { $set: { token: null } },
    { new: true }
  );
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  saveToken,
  removeToken,
};
