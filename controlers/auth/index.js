const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent.js');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');
const verify = require('./verify');
const resendVerify = require('./resendVerify');

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verify,
  resendVerify,
};
