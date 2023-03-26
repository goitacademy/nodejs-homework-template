const register = require("./register");
const verifyEmail = require("./verifyEmail");
const reVerifyEmail = require("./reVerifyEmail");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");


module.exports = {
  register,
  verifyEmail,
  reVerifyEmail,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};