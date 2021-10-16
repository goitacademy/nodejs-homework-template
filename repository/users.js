const User = require("../model/user");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async ({ email, password, subscription }) => {
  const user = new User({ email, password, subscription });
  return await user.save();
};

const updateToken = async ({ id, token }) => {
  return await User.updateOne({ _id: id }, { token });
};
module.exports = {
  findUserByEmail,
  create,
  updateToken,
};
