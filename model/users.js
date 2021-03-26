const User = require('./schemas/users');

const findByEmail = async email => {
  return await User.findOne({ email });
};
const findById = async id => {
  return await User.findOne({ _id: id });
};
const findByVerifyToken = async verifyToken => {
  return await User.findOne({ verifyToken });
};

const create = async ({
  name,
  email,
  password,
  subscription,
  verify,
  verifyToken,
}) => {
  const user = new User({
    name,
    email,
    password,
    subscription,
    verify,
    verifyToken,
  });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};
const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.updateOne({ _id: id }, { verify, verifyToken });
};

const updateSubscription = async (id, body) => {
  return await User.findOneAndUpdate({ _id: id }, { ...body }, { new: true });
};
const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL });
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
  findByVerifyToken,
  updateVerifyToken,
};
