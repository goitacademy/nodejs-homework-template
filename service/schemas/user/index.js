const User = require("./users");
const createUser = async ({ email, password }) => {
  return User.create({ email, password });
};
const checkUser = async ({ email }) => {
  return User.findOne({ email });
};
const updateToken = async ({ tok }) => {
  return User.updateOne({ token: tok });
};
const updateSubscription =async (id, sub) => {
  return User.findByIdAndUpdate({ _id: id }, {subscription:sub});
};

module.exports = { createUser, checkUser, updateToken ,updateSubscription};
