const { signUp } = require("./signUp");
const { logIn } = require("./logIn");
const { logOut } = require("./logOut");
const { currentUser } = require("./currentUser");

module.exports = {
  signUp,
  logIn,
  logOut,
  currentUser,
};
