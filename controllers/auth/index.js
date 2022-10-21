const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getCurrentUser = require("./getCurrentUser");
const updateSubscription = require("./updateSubscription");
const verify = require("./verifyUser");
const resendVerify = require("./resendVerify");

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  verify,
  resendVerify,
};
