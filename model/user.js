const { User } = require("../schemas/users");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const create = async ({ email, password }) => {
  const user = new User({ email, password });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};
const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatarURL: avatar });
};
const findByToken = async (token) => {
  return await User.findOne({ token: token });
};
module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateAvatar,
  findByToken,
};
