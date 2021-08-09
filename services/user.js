const { User } = require('../models');
const gravatar = require('gravatar');

const getById = id => {
  return User.findById(id);
};

const getOne = filter => {
  return User.findOne(filter);
};

const addUser = ({ email, password }) => {
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, avatarURL });
  newUser.setPassword(password);
  return newUser.save();
};

const updateById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo, {new: true, runValidators: true});
};

module.exports = { getById, getOne, addUser, updateById };
