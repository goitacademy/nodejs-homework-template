const signup = require("./signup");
const signin = require("./signin");
const current = require("./current");
const logout = require("./logout");
const updateSubscribtion = require("./updateSubscribtion");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerification = require('./resendVerification');

module.exports = {
  signup,
  signin,
  current,
  logout,
  updateSubscribtion,
  updateAvatar,
  verifyEmail,
  resendVerification,
};
