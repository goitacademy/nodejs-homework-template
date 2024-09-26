const { register } = require("./register");
const { login } = require("./login");
const currentUser = require("./current");
const logout = require("./logout");
const subscription = require("./subscription");
const { updateAvatar } = require("./updateAvatar");
const { verifyEmail } = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register,
  login,
  logout,
  currentUser,
  subscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
