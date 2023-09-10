const User = require('../../schemas/users');

const userSignup = async (email, password, avatarURL, verificationToken) => {
  const response = await User.create({ email, password, avatarURL, verificationToken });
  return response
};

const userLogin = async (user, token) => {
  const response = await User.findOneAndUpdate({ _id: user.id }, { token: token }, { new: true });
  return response
};

const userLogout = async (id) => {
  const response = await User.findOneAndUpdate({ _id: id }, { token: null }, { new: true });
  return response
};

const userCurrent = async (id) => {
  const response = await User.findOne({ _id: id });
  return response
};

const userUpdateSubscription = async (id, subscription) => {
  const response = await User.findOneAndUpdate({ _id: id }, { subscription: subscription }, { new: true });
  return response
}

const userUpdateAvatar = async (id, avatarURL) => {
  const response = await User.findOneAndUpdate({ _id: id }, { avatarURL }, { new: true });
  return response
};

const userVerification = async (verificationToken) => {
  const response = await User.findOneAndUpdate({ verificationToken: verificationToken }, { verificationToken: null, verify: true }, { new: true });
  return response
};

module.exports = {
  userSignup,
  userLogin,
  userLogout,
  userCurrent,
  userUpdateSubscription,
  userUpdateAvatar,
  userVerification,
};