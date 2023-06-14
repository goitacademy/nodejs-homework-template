const registration = require('./registration');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const patchAvatar = require('./patchAvatar');

module.exports = {
  login,
  registration,
  getCurrent,
  logout,
  patchAvatar,
};