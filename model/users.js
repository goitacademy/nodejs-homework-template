const User = require('./schemas/users');

const findByEmail = async email => {
  return await User.findOne({ email });
};
const findById = async id => {
  return await User.findOne({ _id: id });
};

const create = async ({ name, email, password, subscription }) => {
  const user = new User({ name, email, password, subscription });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateSubscription = async (id, body) => {
  return await User.findOneAndUpdate({ _id: id }, { ...body }, { new: true });
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateSubscription,
};
