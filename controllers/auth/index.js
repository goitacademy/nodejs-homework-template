const register = require("./register");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const changeSubscription = require("./changeSubscription");
const updateUserAvatar = require("./updateUserAvatar");

module.exports = {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  logout,
  getCurrent,
  changeSubscription,
  updateUserAvatar,
};