const { User } = require('../../models/auth');
const gravatar = require('gravatar');

const getOne = filter => {
  return User.findOne(filter);
};

const getById = id => User.findById(id);

const add = ({ email, password, avatarURL }) => {
  const newUser = new User({ email, avatarURL });
  newUser.setPassword(password);
  return newUser.save();
};

const updateById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo);
};

module.exports = {
  getOne,
  getById,
  add,
  updateById,
};
