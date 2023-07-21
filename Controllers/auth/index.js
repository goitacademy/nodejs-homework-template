const register = require("./authRegister");
const login = require("./authLogin");
const current = require("./authCurrent");
const logout = require("./authLogOut");

module.exports = {
  register,
  login,
  current,
  logout,
};
