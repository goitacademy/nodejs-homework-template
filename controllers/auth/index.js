const register = require("./register.js");
const login = require("./login.js");
const logout = require("./logout.js");
const getCurrent = require("./getCurrent.js");
const updateAvatar = require("./updateAvatar.js");
const verifyEmail = require("./verifyEmail.js");

module.exports = {
  login,
  register,
  logout,
  getCurrent,
  updateAvatar,
  verifyEmail,
};
