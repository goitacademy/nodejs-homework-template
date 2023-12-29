const User = require("../modelUser/userModel");
const HttpError = require("../Helpers/HttpError");
const { singToken } = require("./jwtService");
//============================================================================
exports.createUser = async (userData) => {
  const newUser = await User.create(userData);
  newUser.password = undefined;
  return newUser;
};

//============================================================================
exports.getUserAll = async () => {
  return await User.find();
};
//============================================================================
exports.getOneUser = (id) => User.findById(id);

//===============================================// проверяем есть ли пользователь в базе=============================
exports.checkUserExites = async (filters) => {
  const userExites = await User.exists(filters);
  if (userExites) throw new HttpError(409, "User exists");
};

//=============================================================================
exports.updateUser = async (id, userData) => {
  const user = await User.findById(id);
  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });
  return user.save();
};

//==============================delete user==================================
exports.deletUser = async (id) => User.findByIdAndDelete(id);

//==================singup====================================

exports.signup = async (data) => {
  const newUserData = {
    ...data,
  };
  const newUser = await User.create(newUserData);
  newUser.password = undefined;

  const token = singToken(newUser.id);
  return { user: newUser, token };
};
