const { ctrlWrapper } = require("../../helpers");
const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const ubdateSubscriptaion = require("./ubdateSubscription");
const ubdateAvatar = require("./ubdateAvatar");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  ubdateSubscriptaion: ctrlWrapper(ubdateSubscriptaion),
  ubdateAvatar: ctrlWrapper(ubdateAvatar),
};
