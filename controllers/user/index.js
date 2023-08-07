const { ctrlWrapper } = require("../../helpers");
const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const ubdateSubscriptaion = require("./ubdateSubscription");
const ubdateAvatar = require("./ubdateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifuEmail = require("./resendVerifuEmail");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  ubdateSubscriptaion: ctrlWrapper(ubdateSubscriptaion),
  ubdateAvatar: ctrlWrapper(ubdateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifuEmail: ctrlWrapper(resendVerifuEmail),
};
