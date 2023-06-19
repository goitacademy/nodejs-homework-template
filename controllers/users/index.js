const { register } = require("./register");
const { login } = require("./login");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { updateSubscriptionUser } = require("./updateSubscriptionUser");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscriptionUser
};
