const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const avatars = require("./avatars");
const verificationToken = require("./verificationToken");
const verify = require("./verify");

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  updateSubscription,
  avatars,
  verificationToken,
  verify,
};
