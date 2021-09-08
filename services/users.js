const { User } = require("../models");

const getOne = (filter) => {
  return User.findOne(filter);
};

const getById = (id) => User.findById(id);

// const add = (newUser) => {
//   return User.create(newUser);
// };

const add = ({ password, ...rest }) => {
  const newUser = new User(rest); // создаем новый экземпляр модели
  newUser.setPassword(password); //сохраням пароль, он хеширует пароль внутри
  return newUser.save();
};

const update = (id, updateUser) => {
  return User.findByIdAndUpdate(id, updateUser);
};

module.exports = {
  getOne,
  add,
  getById,
  update,
};
