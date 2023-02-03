const { register } = require("./register");
const { login } = require("./login");
const { logoutUser } = require("./logoutUser");
const { currentUser } = require("./currentUser");
const { changeSubscription } = require("./changeSubscription");
const { changeUserAvatar } = require("./changeUserAvatar");
const { reVerificationOfEmail } = require("./reVerificationOfEmail");
const { verifyEmail } = require("./verifyEmail");

module.exports = {
  register,
  login,
  logoutUser,
  currentUser,
  changeSubscription,
  changeUserAvatar,
  reVerificationOfEmail,
  verifyEmail,
};
