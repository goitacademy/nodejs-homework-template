const registrationCtrl = require("./registrationCtrl");
const loginCtrl = require("./loginCtrl");
const logoutCtrl = require("./logoutCtrl");
const currentUserCtrl = require("./currentUserCtrl");
const subscriptionChangeCtrl = require("./subscriptionChangeCtrl");
const AvatarCtrl = require("./AvatarCtrl");
const verificationCtrl = require("./verificationCtrl");
const repeatVerificationCtrl = require("./repeatVerificationCtrl");

module.exports = {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  currentUserCtrl,
  subscriptionChangeCtrl,
  AvatarCtrl,
  verificationCtrl,
  repeatVerificationCtrl,
};
