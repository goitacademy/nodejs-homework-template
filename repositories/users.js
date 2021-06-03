const User = require("../model/user");

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (body) => {
  const user = new User(body);
  return await user.save(); // здесь сработает хук userSchema.pre из файла model/user.js
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

module.exports = { findById, findByEmail, createUser, updateToken };
