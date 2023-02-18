const getCurrent = require("./getCurrent");
const updateSubscribe = require("./updateSubscribe");
const updateAvatar = require("./updateAvatar");
const resendVerifyEmail = require("./resendVerifyEmail");
const verifyEmail = require("../users/verifyEmail");

module.exports = {
  getCurrent,
  updateSubscribe,
  resendVerifyEmail,
  verifyEmail,
  updateAvatar,
};
