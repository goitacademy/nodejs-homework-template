const User = require("../models/user");

const findUserByEmail = async (email) => await User.findOne({ email }).lean();

const createNewUser = async (body) => {
  const { name, email, password } = body;
  const newUser = new User({ name, email });
  await newUser.setPassword(password);
  await newUser.save();

  return newUser;
};

module.exports = {
  findUserByEmail,
  createNewUser,
};
