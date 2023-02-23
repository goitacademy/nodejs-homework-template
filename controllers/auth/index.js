const { signIn } = require("./sign-in");
const { signUp } = require("./sign-up");
const { logout } = require("./logout");
const { current } = require("./current");
const { updateUserAvatar } = require("./update-avatar.user");

module.exports = {
  signUp,
  signIn,
  logout,
  current,
  updateUserAvatar,
};
