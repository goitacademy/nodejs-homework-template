const register = require('./register');
const login = require('./login');
const removeToken = require('./logout');
const updateSubscription = require('./updateSubscription');

module.exports = {
  register,
  login,
  removeToken,
  updateSubscription,
};
