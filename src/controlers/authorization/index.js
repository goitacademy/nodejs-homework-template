const { registrationController } = require("./registration");
const { loginController } = require("./login");
const { logoutController } = require("./logout");
const { currentController } = require("./current");

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
};
