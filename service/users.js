const { User } = require("./schemas/user.js");

const getUserById = async (id) => User.findById(id);

const getUser = async (body) => User.findOne(body);

const updateUser = async (id, body) =>
  User.findByIdAndUpdate(id, body, { new: true, runValidators: true });

module.exports = { getUser, getUserById, updateUser };
