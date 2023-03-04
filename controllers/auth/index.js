const { register } = require("./registerUser");
const { login } = require("./loginUser");
const { getCurrent } = require("./getCurrentUser");
const { logout } = require("./logoutUser");
const { updateSubscription } = require("./updateSubscription");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
};
