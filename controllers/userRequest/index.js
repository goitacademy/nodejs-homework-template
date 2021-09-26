const User = require("../../model/user");

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByVerificationToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

const create = async (body) => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateTokenVerify = async (id, verify, verificationToken) => {
  return await User.updateOne({ _id: id }, { verify, verificationToken });
};

const updateAvatar = async (id, avatarUrl) => {
  return await User.updateOne({ _id: id }, { avatarUrl });
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateAvatar,
  findByVerificationToken,
  updateTokenVerify,
};
