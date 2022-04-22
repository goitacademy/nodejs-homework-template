const User = require('../models/user');

const findById = async id => {
  return await User.findById(id);
};

const findByEmail = async email => {
  return await User.findOne({ email });
};

const create = async body => {
  const user = await User(body);

  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate(id, { token });
};

const updateAvatar = async (id, avatar, cloudId=null) => {
  return await User.findByIdAndUpdate(id, {avatar, cloudId})
}
module.exports = { findById, findByEmail, create, updateToken, updateAvatar };