const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const subscriptionStatus = require("./subscriptionStatus");
const verify = require("./verify");
const resendVerify = require("./resendVerify");

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  subscriptionStatus,
  verify,
  resendVerify,
};
