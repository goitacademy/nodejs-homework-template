const login = require("./login");
const register = require("./register");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateUrl = require("./updateAvatar");
const verifyUser = require("./verifyUser");
const resendEmail = require("./resendEmail");

module.exports = {
  login,
  register,
  getCurrent,
  logout,
  updateUrl,
  verifyUser,
  resendEmail,
};
