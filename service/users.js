const User = require("./schemas/user");

const createUser = async (body) => {
  return await User.create(body);
};

const regLogUser = async (email) => {
  return await User.findOne({ email });
};

const currentUser = async (userId) => {
  return await User.findOne({ _id: userId });
};

module.exports = {
  createUser,
  regLogUser,
  currentUser,
};
