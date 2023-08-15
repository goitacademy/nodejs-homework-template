const User = require("./schemas/user");

const findUserById = async (id) => {
  return User.findOne({ _id: id });
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const createUser = async (userFields) => {
  const user = new User(userFields);
  return User.create(user);
};

const updateToken = async (id, token) => {
  return User.updateOne({ _id: id }, { token });
};

const updateSubscription = async (id, subscription) => {
  return User.updateOne({ _id: id }, { subscription });
};

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateToken,
  updateSubscription,
};
