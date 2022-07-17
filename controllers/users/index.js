const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const reSendVerifyEmail = require("./reVerifyEmail");

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
  verifyEmail,
  reSendVerifyEmail,
};
