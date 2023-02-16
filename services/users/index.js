const register = require('./register');
const login = require('./login');
const removeToken = require('./logout');
const updateSubscription = require('./updateSubscription');
const updateToken = require('./updateToken');
const updateAvatar = require('./updateAvatar');
const resizeAvatar = require('./resizeAvatar');
const sendEmail = require('./mailService');

module.exports = {
  register,
  login,
  removeToken,
  updateSubscription,
  updateToken,
  updateAvatar,
  resizeAvatar,
  sendEmail,
};
