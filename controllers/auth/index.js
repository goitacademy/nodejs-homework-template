const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const subscription = require('./subscription');
const verify = require('./verify');
const repeatVerifyMail = require('./repeatVerifyMail')
const updateAvatar = require('./updateAvatar');

module.exports = {
  signup,
  login,
  logout,
  current,
  subscription,
  verify,
  updateAvatar,
  repeatVerifyMail
}
