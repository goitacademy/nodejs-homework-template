const { User } = require('../model');
const getUserById = id => User.findById(id);

const getOneUser = filter => {
  return User.findOne(filter);
};

const addUser = ({ email, password }) => {
  const newUser = new User({ email });
  newUser.setPassword(password);
  return newUser.save();
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // return User.create({email, password: hashPassword});
};

const updateUserById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo);
};

module.exports = {
  getOneUser,
  addUser,
  getUserById,
  updateUserById,
};
