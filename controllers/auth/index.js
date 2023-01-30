const { signUp } = require("./signUp");
const { logIn } = require("./logIn");
const { currentUser } = require("./currentUser");
const { logOut } = require("./logOut");
const { uploadController } = require("./upload");

module.exports = {
  signUp,
  logIn,
  currentUser,
  logOut,
  uploadController,
};
