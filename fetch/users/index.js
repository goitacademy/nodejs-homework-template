const getCurrentUser = require("./current");
const login = require("./login");
const logout = require("./logout");
const signup = require("./signup");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  getCurrentUser,
  login,
  logout,
  signup,
  updateSubscription,
  updateAvatar
};