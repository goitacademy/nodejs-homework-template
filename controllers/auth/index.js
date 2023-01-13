const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateAvatar = require("./updateAvatar");
const verifyToken = require("./verifyToken");
module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  verifyToken,
};
