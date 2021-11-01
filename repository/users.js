const User = require("../model/user");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findById(id);
};

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar });
};

const updateSub = async (subscription) => {
  return await User.findOneAndUpdate({ subscription });
};

module.exports = {
  findByEmail,
  create,
  updateToken,
  findById,
  updateSub,
  updateAvatar,
};
