const User = require('./schemas/userSchema');

const findUserById = async (id) => {
  return await User.findById(id);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const getUserByVerifyToken = async (token) => {
  return await User.findOne({ verifyToken: token });
};

const createUser = async (userOptions) => {
  const user = new User(userOptions);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate(id, { token });
};

const updateSubscription = async (id, body) => {
  return await User.findByIdAndUpdate(id, { ...body }, { new: true });
};
const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL });
};

const updateVerifyToken = async (id, verify, token) => {
  return await User.updateOne({ _id: id }, { verify, verifyToken: token });
};
module.exports = {
  findUserById,
  findUserByEmail,
  getUserByVerifyToken,
  createUser,
  updateToken,
  updateSubscription,
  updateAvatar,
  updateVerifyToken,
};
