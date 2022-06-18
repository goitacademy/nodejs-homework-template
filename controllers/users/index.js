const { registerUser } = require("./register");
const { login } = require("./login");
const { getCurent } = require("./getCurrent");
const { logout } = require("./logout");

module.exports = {
  registerUser,
  login,
  getCurent,
  logout,
};
