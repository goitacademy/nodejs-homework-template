const { ctrlWrapper } = require("../../helpers");
const subscription = require("./subscription");
const current = require("./current");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const avatars = require("./avatars");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  subscription: ctrlWrapper(subscription),
  avatars: ctrlWrapper(avatars),
};
