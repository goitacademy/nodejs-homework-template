const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const listCurrent = require("./listCurrent");
const setAvatar = require("./setAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");


module.exports = {
  register,
  login,
  logout,
  listCurrent,
  setAvatar,
  verifyEmail,
  resendVerifyEmail,
};
