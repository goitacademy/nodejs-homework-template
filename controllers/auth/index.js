const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const setAvatar = require('./setAvatar');
const setSubscription = require('./setSubscription');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail')

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  setAvatar,
  setSubscription,
  verifyEmail,
  resendVerifyEmail,
};
