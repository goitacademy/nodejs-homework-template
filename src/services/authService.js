const { User } = require("../models");

const checkUserDB = async (email) => {
  return await User.findOne({ email });
};

const addNewUser = async (body) => {
  const { email, password } = body;

  const newUser = new User({ email, password });
  newUser.setPassword(password);

  return await newUser.save();
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, data) => {
  return User.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
};

module.exports = {
  checkUserDB,
  addNewUser,
  findUserById,
  updateUser,
};
