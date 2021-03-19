const User = require("./schemas/user");

const findByEmail = async (email) => {
  return User.findOne({ email });
};

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const findByToken = async (token) => {
  return await User.findOne({ token: token });
};

const create = async ({ email, password, subscription, name }) => {
  const user = new User({ email, password, subscription, name });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
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
};
