const { login } = require("./login");
const { logout } = require("./logout");
const { getCurrent } = require("./getCurrent");
const { register } = require("./register");
const { updateSubscription } = require("./updateSubscription");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
};
