const { User } = require("../schemas/usersSchema");

const getUserByEmail = async (email) => await User.findOne({ email });

const getUserById = async (id) => await User.findOne({ _id: id });

const createUser = async ({ password, email, subscription }) =>
  await User.create({
    password,
    email,
    subscription,
  });

const setToken = async (email, token) =>
  await User.findOneAndUpdate({ email }, { token });

module.exports = { createUser, getUserByEmail, setToken, getUserById };
