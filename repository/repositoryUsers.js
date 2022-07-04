const { User } = require('../models');

const findById = async id => {
  return await User.findById(id);
};

const findByEmail = async email => {
  return await User.findOne({ email });
};
const findByVerifyToken = async verificationTokenEmail => {
  return await User.findOne({ verificationTokenEmail });
};

const findByIdAndUpdate = async (id, subscription) => {
  return await User.findByIdAndUpdate(id, { subscription }, { new: true });
};
const create = async body => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatarURL, idAvatarCloud = null) => {
  return await User.updateOne({ _id: id }, { avatarURL, idAvatarCloud });
};
const updateVerify = async (id, status) => {
  return await User.updateOne({ _id: id }, { isVerification: status, verificationTokenEmail: null });
};

module.exports = {
  findById,
  findByIdAndUpdate,
  findByEmail,
  findByVerifyToken,
  create,
  updateToken,
  updateAvatar,
  updateVerify,
};
