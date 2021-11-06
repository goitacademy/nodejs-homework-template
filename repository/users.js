const User = require("../model/user");

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken });
};

const create = async (options) => {
  const user = new User(options); //создали экземпляр юзера
  return await user.save(); // сохранили экземпляр в базу
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateTokenVerify = async (id, isVerified, verifyToken) => {
  return await User.updateOne({ _id: id }, { isVerified, verifyToken });
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar });
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateAvatar,
  updateTokenVerify,
  findUserByVerifyToken,
};
