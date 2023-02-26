const { signup } = require("./signup");
const { login } = require("./login");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { updateSubscription } = require("./updateSubscription");
const { updateAvatarCloudinary } = require("./updateAvatarCloudinary");
const { verifyEmail } = require("./verifyEmail");
const { resendVerifyEmail } = require("./resendVerifyEmail");
const { getAll } = require("./getAll");

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatarCloudinary,
  verifyEmail,
  resendVerifyEmail,
  getAll,
};
