const User = require("./schemas/userSchema");

const findUserById = async (id) => {
  return await User.findById(id);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userOptions) => {
  const user = new User(userOptions);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate(id, { token });
};

const updateSubscription = async (id, body) => {
  return await User.findByIdAndUpdate(id, { ...body }, { new: true });
};

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateToken,
  updateSubscription,
};
