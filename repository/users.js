const User = require("../model/user");

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateSubscription = async (userId, body) => {
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const updateAvatar = async (id, avatar, idUserCloud = null) => {
  return await User.updateOne({ _id: id }, { avatar, idUserCloud });
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
};