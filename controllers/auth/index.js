const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const verify = require('./verify');
const updateAvatar = require('./updateAvatar');

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
  verify,
  updateAvatar,
};
