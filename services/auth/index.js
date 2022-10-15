const getByEmail = require("./getByEmail");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const getByVerifyToken = require("./getByVerifyToken");
const verifyEmail = require("./verifyEmail");

module.exports = {
  getByEmail,
  login,
  logout,
  register,
  updateSubscription,
  updateAvatar,
  getByVerifyToken,
  verifyEmail,
};
