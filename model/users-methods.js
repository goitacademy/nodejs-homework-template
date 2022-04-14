const User = require('./users-schema');

const findUserById = async userId => {
  return await User.findById(userId);
};

const findUserByEmail = async email => {
  return await User.findOne({ email });
};

const createUser = async body => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (userId, token) => {
  return await User.updateOne({ _id: userId }, { token });
};

const updateSubscription = async (userId, body) => {
  return await User.findByIdAndUpdate(userId, { ...body }, { new: true });
};

module.exports = { findUserById, findUserByEmail, createUser, updateToken, updateSubscription };