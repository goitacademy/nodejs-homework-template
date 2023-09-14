const User = require("../models/user.model");

const createUser = async (email, password, avatarUrl) => {
  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.avatarURL = avatarUrl;
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

const updateAvatar = (id, fileName) => {
  return User.findByIdAndUpdate(
    { _id: id },
    { $set: { avatarURL: fileName } },
    { new: true }
  );
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  saveToken,
  removeToken,
  updateAvatar,
};
