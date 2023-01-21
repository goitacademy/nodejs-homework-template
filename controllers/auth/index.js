const registration = require("./registration");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateAvatar = require('./updateAvatar')
const verify = require("./verify");
const resendVerifyEmail = require("./resendVerifyEmail")

module.exports = {
  registration,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verify,
  resendVerifyEmail,
};
