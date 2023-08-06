const { User } = require("../models/user");

const getUser = (body) => User.findOne(body);

const getUserById = (_id) => User.findById(_id);

const addUser = (body) => User.create(body);

const updateUser = (_id, body) =>
  User.findByIdAndUpdate(_id, body, { new: true });

module.exports = {
  getUser,
  getUserById,
  addUser,
  updateUser,
};