const { register } = require("./register");
const { login } = require("./login");
const { getCurrent } = require("./current");
const { logout } = require("./logout");
const { subscription } = require("./subscription");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  subscription,
  updateAvatar,
};
