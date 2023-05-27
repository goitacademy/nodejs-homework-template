const { ctrlWrapper } = require("../../helpers");

const signup = require("./signup");
const signin = require("./signin");
const getCurrentUser = require("../users/getCurrentUser");
const signout = require("./signout");

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  signout: ctrlWrapper(signout),
};
