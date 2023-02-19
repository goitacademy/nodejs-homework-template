const { signIn } = require("./sign-in");
const { signUp } = require("./sign-up");
const { logout } = require("./logout");
const { current } = require("./current");

module.exports = {
  signUp,
  signIn,
  logout,
  current,
};
