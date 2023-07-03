const { ctrlWrapper } = require("../../Helpers");

const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { getCurrent } = require("./current");
const { subscription } = require("./subscription");
const { verifyEmail } = require("./verifyEmail");
const { resendVerifyEmail } = require("./resendVerifyEmail");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  subscription: ctrlWrapper(subscription),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
