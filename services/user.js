const { User } = require('../models');

const getById = id => User.findById(id);

const getOne = filter => User.findOne(filter);

const addUser = async ({ password, ...other }) => {
  console.log('other :>> ', other);
  const newUser = await new User(other);
  newUser.setPassword(password);
  return newUser.save();
};

const updateById = (id, updateData) => {
  return User.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
  getById,
  getOne,
  addUser,
  updateById,
};