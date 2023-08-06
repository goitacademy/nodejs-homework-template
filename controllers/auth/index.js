const { ctrlWrapper } = require("../../decorators/index");

const signup = require("./signup.js");
const signin = require("./signin.js");
const getCurrent = require("./getCurrent.js");
const signout = require("./signout.js");
const updateSubscription = require("./updateSubscription.js");
const updateAvatar = require("./updateAvatar.js");

module.exports = {
  signin: ctrlWrapper(signin),
  signup: ctrlWrapper(signup),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
