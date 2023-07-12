const { ctrlWrapper } = require("../../helpers");

const register = require("./signUp");
const login = require("./signIn");
const getCurrent = require("./currentUser");
const logout = require("./logout");
const subscription = require("./updateSubscription");
const addAvatar = require("./avatar");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  subscription: ctrlWrapper(subscription),
  addAvatar: ctrlWrapper(addAvatar),
};
