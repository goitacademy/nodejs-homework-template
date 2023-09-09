const getCurrentUser = require("./current");
const login = require("./login");
const logout = require("./logout");
const signup = require("./signup");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const resendEmail = require("./resendEmail");
const verifyEmail = require("./verifyEmail");

module.exports = {
  getCurrentUser,
  login,
  logout,
  signup,
  updateSubscription,
  updateAvatar,
  resendEmail,
  verifyEmail
};