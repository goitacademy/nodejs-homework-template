const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent.js");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription.js");
const updateAvatar = require("./updateAvatar");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper,
};
