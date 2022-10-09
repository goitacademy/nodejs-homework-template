const login = require("./login");
const signup = require("./signup");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateAvatar = require("./updateAvatar");
const updateSubscription = require("./updateSubscription");
const verifyEmail = require("./verifyEmail");
const sendVerifyEmail = require("./sendVerifyEmail");
const googleAuthLogin = require("./googleAuthLogin");
const facebookAuthLogin = require("./facebookAuthLogin");

module.exports = {
  login,
  signup,
  logout,
  getCurrent,
  updateAvatar,
  updateSubscription,
  verifyEmail,
  sendVerifyEmail,
  googleAuthLogin,
  facebookAuthLogin,
};
