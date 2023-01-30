const { signUp } = require("./signUp");
const { logIn } = require("./logIn");
const { logOut } = require("./logOut");
const { currentUser } = require("./currentUser");
const { uploadAvatar } = require("./uploadAvatar");

module.exports = {
  signUp,
  logIn,
  logOut,
  currentUser,
  uploadAvatar,
};
