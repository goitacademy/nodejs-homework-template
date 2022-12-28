const loginController = require("./loginController");
const logoutController = require("./logoutController");
const registerController = require("./registerController");
const {
  currentUserController,
  userStatusController,
} = require("./userController");

module.exports = {
  loginController,
  logoutController,
  registerController,
  currentUserController,
  userStatusController,
};
