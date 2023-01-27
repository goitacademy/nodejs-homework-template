const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const reVerificationEmail = require("./reVerificationEmail");

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  reVerificationEmail,
};
