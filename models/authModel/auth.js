const UserModel = require("./UserModel");

const register = async (user) => {
  return UserModel.create(user);
};

const getUserByEmail = async (email) => {
  return UserModel.findOne({ email: email });
};

const getUserById = async (id) => {
  return UserModel.findOne({ _id: id });
};

const updateUserById = async ({ id, body }) => {
  return UserModel.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });
};

module.exports = {
  register,
  getUserByEmail,
  getUserById,
  updateUserById,
};
