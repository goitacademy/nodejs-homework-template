const User = require("../models/user");

const findUserByEmail = async (email) => await User.findOne({ email });

const createNewUser = async (body) => {
  const { name, email, password } = body;
  const newUser = new User({ name, email });
  await newUser.setPassword(password);
  await newUser.save();

  return newUser;
};

const updateUserToken = async (id, token = null) => User.findByIdAndUpdate(id, { token });

module.exports = {
  findUserByEmail,
  createNewUser,
  updateUserToken,
};
