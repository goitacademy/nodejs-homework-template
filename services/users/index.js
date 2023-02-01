const register = require('./register');
const login = require('./login');
const removeToken = require('./logout');
const updateSubscription = require('./updateSubscription');
const updateToken = require('./updateToken');

module.exports = {
  register,
  login,
  removeToken,
  updateSubscription,
  updateToken,
};
