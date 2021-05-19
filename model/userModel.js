const User = require('./schemas/user');

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByVerifyTokenEmail = async (verify) => {
  return await User.findOne({ verifyTokenEmail: verify });
};
const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const create = async ({ password, email, subscription }) => {
  const user = new User({ password, email, subscription });
  return await user.save();
};
const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatarURL: avatar });
};

const updateTokenVerify = async (id, verify, verifyToken) => {
  return await User.updateOne(
    { _id: id },
    { verify, verifyTokenEmail: verifyToken }
  );
};

module.exports = {
  findByEmail,
  findByVerifyTokenEmail,
  findById,
  create,
  updateToken,
  updateAvatar,
  updateTokenVerify,
};
