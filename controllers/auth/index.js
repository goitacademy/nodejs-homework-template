const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const updateUserStatus = require("./updateUserStatus");
const getCurrentUser = require("./getCurrentUser");
const updateAvatar = require("./updateAvatar");

module.exports = {
  register,
  login,
  logout,
  updateUserStatus,
  getCurrentUser,
  updateAvatar,
};
