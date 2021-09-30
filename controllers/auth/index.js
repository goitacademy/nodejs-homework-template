const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const verify = require('./verify');
const updateAvatar = require('./updateAvatar');
const resendVerify = require('./resendVerify');

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
  verify,
  updateAvatar,
  resendVerify,
};
