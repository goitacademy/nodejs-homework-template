const { signup } = require("./signup.js");
const { login } = require("./login.js");
const { logout } = require("./logout.js");
const { currentUser } = require("./currentUser.js");
const { updateSubscription } = require("./updateSubscription.js");
const { updateByAvatar } = require("./updateByAvatar.js");

module.exports = {
  signup,
  login,
  logout,
  currentUser,
  updateSubscription,
  updateByAvatar,
};
