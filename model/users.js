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

const create = async ({ email, password, verifyToken }) => {
  const user = new User({ email, password, verifyToken });
  return await user.save();
};

const updateToken = async (userId, token) => {
  return await User.updateOne({ _id: userId }, { token });
};

const updateAvatar = async (userId, avatar, imgIdCloud = null) => {
  return await User.updateOne(
    { _id: userId },
    { avatarURL: avatar, imgIdCloud }
  );
};

const updateSubUser = async (id, subscription) => {
  return await User.updateOne({ _id: id }, { subscription });
};

const findByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken });
};

const updateVerifyToken = async (id, verifyToken) => {
  return await User.findOneAndUpdate({ _id: id }, { verifyToken });
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  findByToken,
  updateAvatar,
  updateSubUser,
  findByVerifyToken,
  updateVerifyToken,
};
