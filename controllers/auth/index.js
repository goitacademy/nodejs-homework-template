const { ctrlWrapper } = require("../../helpers");

const register = require("./register");
const login = require("./login");
const logout = require("./logout");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
