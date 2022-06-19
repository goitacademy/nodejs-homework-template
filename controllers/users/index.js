const { registerUser } = require("./register");
const { login } = require("./login");
const { getCurent } = require("./getCurrent");
const { logout } = require("./logout");
const { patchAvatar } = require("./patchAvatar");

module.exports = {
  registerUser,
  login,
  getCurent,
  logout,
  patchAvatar,
};
