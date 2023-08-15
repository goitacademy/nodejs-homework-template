const register = require("./registerUser");
const login = require("./loginUser");
const current = require("./current");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
module.exports = {
  register,
  login,
  current,
  logout,
  updateSubscription,
};
