const { cntWrapper } = require("../../Helpers");
const current = require("./current");
const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const changeAvatar = require("./changeAvatar");
module.exports = {
  register: cntWrapper(register),
  login: cntWrapper(login),
  current: cntWrapper(current),
  logout: cntWrapper(logout),
  changeAvatar: cntWrapper(changeAvatar),
};
