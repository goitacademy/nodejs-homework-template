const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./currentUser");
const updateUserSubscription = require("./updateUserSubscription");

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateUserSubscription
};
