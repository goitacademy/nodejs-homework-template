const { ctrlWrapper } = require("../../utils");

const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const changeSubscription = require("./changeSubscription");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  changeSubscription: ctrlWrapper(changeSubscription),
};
