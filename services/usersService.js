const { User } = require("../schemas/usersSchema");

const getUserByEmail = async (email) => await User.findOne({ email });

const createUser = async ({ password, email, subscription }) =>
  await User.create({
    password,
    email,
    subscription,
  });

module.exports = { createUser, getUserByEmail };
