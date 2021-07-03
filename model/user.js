const User = require('./schemas/user');

const findUserById = async id => {
  return await User.findOne({ _id: id });
};

const findUserByEmail = async email => {
  return await User.findOne({ email });
};

const createUser = async ({ name, email, password, subscription }) => {
  const user = new User({ name, email, password, subscription });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatar, idCloudImg) => {
  return await User.updateOne({ _id: id }, { avatar, idCloudImg });
};

module.exports = {
  findUserById,
  createUser,
  findUserByEmail,
  updateToken,
  updateAvatar,
};
