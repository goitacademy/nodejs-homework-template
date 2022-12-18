const UserModel = require("./UpdateUserModel");
const UpdateUserModel = require("./UpdateUserModel");

const register = async (user) => {
  return UserModel.create(user);
};

const getUserByEmail = async (email) => {
  return UserModel.findOne({ email: email });
};

const updateUserById = async ({ id, body }) => {
  return UpdateUserModel.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });
};

module.exports = {
  register,
  getUserByEmail,
  updateUserById,
};
