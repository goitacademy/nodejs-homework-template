const { ctrlWrapper } = require('../../helpers');
const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscriptionUser = require('./updateSubscriptionUser');

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
};