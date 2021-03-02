const User = require('./schemas/user');

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (userId) => {
  return await User.findOne({ _id: userId });
};

const findByToken = async (token) => {
  return await User.findOne({ token });
};

const create = async ({ email, password }) => {
  const user = new User({ email, password });
  return await user.save();
};

const updateToken = async (userId, token) => {
  return await User.updateOne({ _id: userId }, { token });
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  findByToken,
};
