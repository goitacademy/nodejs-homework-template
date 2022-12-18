const UserModel = require("./UserModel");

const register = async (user) => {
  // console.log(UserModel.create(user));
  return UserModel.create(user);
};

const getUserByEmail = async (email) => {
  return UserModel.findOne({ email: email });
};
module.exports = {
  register,
  getUserByEmail,
};
