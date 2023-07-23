const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const changeSubscription = require("./changeSubscription");
const updateUserAvatar = require("./updateUserAvatar");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  changeSubscription,
  updateUserAvatar,
};