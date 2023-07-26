const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const { getCurrentUser } = require("./getCurrentUser");
const { logoutUser } = require("./logoutUser");
const { updateUserSubscription } = require("./updateUserSubscription");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateUserSubscription,
  updateAvatar,
};
