const registerUser = require("./register");
const loginUser = require("./login");
const logoutUser = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const uploadAvatar = require("./uploadAvatar");
const emailResend = require("./emailResend");
const emailVerification = require("./emailVerification");

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  uploadAvatar,
  emailVerification,
  emailResend,
};
