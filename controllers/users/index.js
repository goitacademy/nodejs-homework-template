const { ctrlWrapper } = require("../../helpers");

const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const getCurrentUser = require("./getCurrentUser");
const logoutUser = require("./logoutUser");
const updateSubscription = require("./updateSubscription");

module.exports = {
  register: ctrlWrapper(registerUser),
  login: ctrlWrapper(loginUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logout: ctrlWrapper(logoutUser),
  updateSubscription: ctrlWrapper(updateSubscription),
};
