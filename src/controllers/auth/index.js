const { signup } = require("./signup");
const { login } = require("./login");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { updateSubscription } = require("./updateSubscription");
const { updateAvatarCloudinary } = require("./updateAvatarCloudinary");
const { verifyEmail } = require("./verifyEmail");
const { repeatVerifyEmail } = require("./repeatVerifyEmail");

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatarCloudinary,
  verifyEmail,
  repeatVerifyEmail,
};
