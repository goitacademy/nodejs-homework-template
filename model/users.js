const User = require("./schemas/user");

const findUserById = async (id) => {
  return User.findOne({ _id: id });
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};
const findUserByToken = async (verificationToken) => {
  return User.findOne({ verificationToken });
};

const createUser = async (userFields) => {
  const user = new User(userFields);
  return User.create(user);
};

const updateToken = async (id, token) => {
  return User.updateOne({ _id: id }, { token });
};

const updateSubscription = async (id, subscription) => {
  return User.updateOne({ _id: id }, { subscription });
};

const updateAvatar = async (id, avatarUrl) => {
  return User.updateOne({ _id: id }, { avatarUrl });
};

const updateUser = async (id, fields) => {
  return User.findByIdAndUpdate({ _id: id }, { ...fields }, { new: true });
};

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateToken,
  updateSubscription,
  updateAvatar,
  findUserByToken,
  updateToken,
  updateUser,
};
