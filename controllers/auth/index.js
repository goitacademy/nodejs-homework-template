const { register } = require('./register');
const { login } = require('./login');
const { getCurrent } = require('./current');
const { logout } = require('./logout');
const { updateSubscriptionStatus } = require('./updateSubscriptionStatus');

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscriptionStatus,
};
