const { getCurrent } = require("./getCurrent");
const { login } = require("./login");
const { logout } = require("./logout");
const { register } = require("./register");
const { updateStatusUser } = require("./updateStatusUser");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateStatusUser,
};