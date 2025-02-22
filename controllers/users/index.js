const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const getUsers = require("./getUsers");
const updateSubscription = require("./updateSubscription");
const deleteUserByMail = require("./deleteUserByMail");
const verifyUserByToken = require("./verifyUserByToken");


module.exports = {
  register,
  login,
  logout,
  current,
  getUsers,
  updateSubscription,
  deleteUserByMail,
  verifyUserByToken,
};
