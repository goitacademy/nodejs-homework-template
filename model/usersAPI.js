const User = require("./schemas/user");

const findByEmail = async (email) => {
  return User.findOne({ email });
};

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const findByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken });
};

const findByToken = async (token) => {
  return await User.findOne({ token: token });
};

const create = async ({
  email,
  password,
  subscription,
  name,
  verify,
  verifyToken,
}) => {
  const user = new User({
    email,
    password,
    subscription,
    name,
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

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatarURL: avatar });
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  findByToken,
  updateAvatar,
  findByVerifyToken,
  updateVerifyToken,
};
