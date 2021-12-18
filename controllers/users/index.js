const signup = require('./signup');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');
const updateAvatars = require('./updateAvatars');

module.exports = {
  signup,
  getCurrent,
  login,
  logout,
  updateSubscription,
  updateAvatars,
};
