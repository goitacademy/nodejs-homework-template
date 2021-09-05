const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./getCurrentUser");

module.exports = {
  login,
  register,
  logout,
  currentUser,
};
