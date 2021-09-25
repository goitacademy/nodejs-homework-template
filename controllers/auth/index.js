const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
};
