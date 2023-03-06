const { controllerWrapper } = require("../../utils");

const register = require("./register");
const login = require("./login");
const current = require("./current");
const logout = require("./logout");

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  current: controllerWrapper(current),
  logout: controllerWrapper(logout),
};
