const registrationController = require("./registrationController");
const loginController = require("./loginController");
const logoutController = require("./logoutController");
const currentUserControler = require("./currentUserControler");
const subscriptionChangeController = require('./subscriptionChangeController');

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserControler,
  subscriptionChangeController,
};
