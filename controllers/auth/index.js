const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const changeSubscription = require("./changeSubscription");
const updateAvatar = require("./updateAvatar");
const resendVerifyEmail = require("./resendVerifyEmail");
const verifyEmail = require("./verifyEmail");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  changeSubscription,
  updateAvatar,
  resendVerifyEmail,
  verifyEmail,
};
