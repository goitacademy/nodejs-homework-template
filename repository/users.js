const User = require("../model/user");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (options) => {
  const user = new User(options); //создали экземпляр юзера
  return await user.save(); // сохранили экземпляр в базу
};

module.exports = {
  findByEmail,
  create,
};
