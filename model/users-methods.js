const User = require("./users-schema");

const findUserById = async userId => {
  return await User.findById(userId);
};

const findUserByEmail = async email => {
  return await User.findOne({ email });
};

const findUserByVerificationToken = async verificationToken => {
  return await User.findOne({ verificationToken });
};

const createUser = async body => {
  const user = new User(body);
  return await user.save();
};

const updateVerificationStatus = async (id, isVerified, verificationToken) => {
  return await User.updateOne({ _id: id }, { isVerified, verificationToken });
};

const updateToken = async (userId, token) => {
  return await User.updateOne({ _id: userId }, { token });
};

const updateSubscription = async (userId, body) => {
  return await User.findByIdAndUpdate(userId, { ...body }, { new: true });
};

const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL });
};

module.exports = {
  findUserById,
  findUserByEmail,
  findUserByVerificationToken,
  createUser,
  updateVerificationStatus,
  updateToken,
  updateSubscription,
  updateAvatar,
};