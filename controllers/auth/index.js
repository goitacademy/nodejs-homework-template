const register = require("./signup");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./currentUser");
const changeAvatar = require("./changeAvatar");

module.exports = {
  register,
  login,
  logout,
  currentUser,
  changeAvatar,
};
