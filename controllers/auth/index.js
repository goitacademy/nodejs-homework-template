const logInUser = require("./logInUser");

const logOutUser = require("./logOutUser");

const registerUser = require("./registerUser");

const updateUserPassword = require("./updateUserPassword");

const currentUser = require("./currentUser");

const verifyUserViaEmail = require("./verifyUser");

module.exports = {
  logInUser,
  logOutUser,
  registerUser,
  updateUserPassword,
  currentUser,
  verifyUserViaEmail,
};
