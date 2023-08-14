const { ctrlWrapper } = require("../../decorators");

const register = require("./register");
const verify = require("./verify");
const resendVerify = require("./resendVerify");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateUserSubscription = require("./updateUserSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerify: ctrlWrapper(resendVerify),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
