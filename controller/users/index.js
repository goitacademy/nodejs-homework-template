const register = require("./registerUser");
const login = require("./loginUser");
const current = require("./current");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  register,
  login,
  current,
  logout,
  updateSubscription,
  updateAvatar,
};
