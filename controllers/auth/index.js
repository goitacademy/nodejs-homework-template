const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updSubscription = require('./updSubscription');
const updateAvatar = require('./updateAvatar');
const verify = require('./verify');

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updSubscription,
  updateAvatar,
  verify,
};