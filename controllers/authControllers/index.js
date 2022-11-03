const registeration = require('./registeration');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const patchAvatar = require('./patchAvatar');

module.exports = {
  login,
  registeration,
  getCurrent,
  logout,
  patchAvatar,
};
