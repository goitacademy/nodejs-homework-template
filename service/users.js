const User = require("./schemas/user");

const createUser = async (body) => {
  return await User.create(body);
};

const regLogUser = async (email) => {
  return await User.findOne({ email });
};

const currentUser = async (id) => {
  return await User.findOne({ _id: id });
};

const updateUser = async (userId, body) => {
  return User.findOneAndUpdate({ _id: userId }, body, { new: true });
};

module.exports = {
  createUser,
  regLogUser,
  currentUser,
  updateUser,
};
