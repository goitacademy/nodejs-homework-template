const User = require('./schemas/user');

const findByEmail = async (email) => {
  return await User.findOne({ email });
};
const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const create = async ({ password, email, subscription }) => {
  const user = new User({ password, email, subscription });
  return await user.save();
};
const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
};
