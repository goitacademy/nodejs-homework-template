const signUp = require("./signUp");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateAvatar = require('./updateAvatar');
const verifyEmail = require('./verifyEmail');
const checkVerifyEmail = require('./checkVerifyEmail');

module.exports = {
  signUp,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  checkVerifyEmail,
};
