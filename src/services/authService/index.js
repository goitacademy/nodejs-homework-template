const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { currentUser } = require("./currentUser");
const { updateSubscription } = require("./updateSubscription");
const { userVerificationService } = require("./userVerificationService");
const { sendVerifyService } = require("./sendVerifyService");
const { sendEmailService } = require("./sendEmailService");

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateSubscription,
  userVerificationService,
  sendVerifyService,
  sendEmailService,
};
