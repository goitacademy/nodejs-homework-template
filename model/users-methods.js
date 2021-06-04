const User = require('./users-schema');

const findUserById = async id => {
  return await User.findById(id);
};

const findUserByEmail = async email => {
  return await User.findOne({ email });
};

const createUser = async body => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

module.exports = { findUserById, findUserByEmail, createUser, updateToken };
