const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const updateUserStatus = require("./updateUserStatus");
const getCurrentUser = require("./getCurrentUser");

module.exports = {
  register,
  login,
  logout,
  updateUserStatus,
  getCurrentUser,
};
