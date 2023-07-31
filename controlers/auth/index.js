const getCurrent = require('./authCurrent');
const login = require('./authLogin');
const logout = require('./authLogout');
const register = require('./authRegister');
const updateSubscription = require('./authUpdateSubscription');

module.exports = {
  getCurrent,
  login,
  logout,
  register,
  updateSubscription,
};