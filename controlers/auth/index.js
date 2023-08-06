const getCurrent = require('./authCurrent');
const login = require('./authLogin');
const logout = require('./authLogout');
const register = require('./authRegister');
const updateSubscription = require('./authUpdateSubscription');
const updateAvatar = require('./updateAvatar');

module.exports = {
  getCurrent,
  login,
  logout,
  register,
  updateSubscription,
  updateAvatar,
};