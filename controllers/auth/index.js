const register = require("./register");
const verifyEmail = require("./updateSubscription");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");

module.exports = {
  register,
  verifyEmail,
  login,
  getCurrent,
  logout,
  updateSubscription,
};
