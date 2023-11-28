const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { getCurrent } = require("./getCurrent");
const { uploadAvatar } = require("./uploadAvatar");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  uploadAvatar,
};
