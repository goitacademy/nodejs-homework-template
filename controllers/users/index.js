const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const patchUser = require("./patchUser");
const patchAvatar = require("./patchAvatar");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  patchUser,
  patchAvatar,
};
