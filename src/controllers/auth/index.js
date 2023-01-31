const { registerController } = require("./registerController");
const { loginController } = require("./loginController");
const { logoutController } = require("./logoutController");
const { currentController } = require("./currentController");
const {
  updateSubscriptionController,
} = require("./updateSubscriptionController");
const { userVerificationController } = require("./userVerificationController");
const { sendVerifyController } = require("./sendVerifyController");

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentController,
  updateSubscriptionController,
  userVerificationController,
  sendVerifyController,
};
