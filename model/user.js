const User = require('./schemas/user');
require('dotenv').config();

const findUserById = async id => {
  return await User.findOne({ _id: id });
};

const findUserByEmail = async email => {
  return await User.findOne({ email });
};

const createUser = async ({
  name,
  email,
  password,
  subscription,
  verifyToken,
}) => {
  const user = new User({ name, email, password, subscription, verifyToken });

  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatar, idCloudImg) => {
  return await User.updateOne({ _id: id }, { avatar, idCloudImg });
};

const findByToken = async token => {
  return await User.findOne({ token });
};

const findByVeryfiToken = async ({ verifyToken }) => {
  return await User.findOne({ verifyToken });
};

const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.findOneAndUpdate({ _id: id }, { verify, verifyToken });
};

module.exports = {
  findUserById,
  createUser,
  findUserByEmail,
  updateToken,
  updateAvatar,
  findByToken,
  findByVeryfiToken,
  updateVerifyToken,
};
