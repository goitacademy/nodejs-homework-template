const User = require("../model/user");

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (options) => {
  const user = new User(options); //создали экземпляр юзера
  return await user.save(); // сохранили экземпляр в базу
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
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
};
