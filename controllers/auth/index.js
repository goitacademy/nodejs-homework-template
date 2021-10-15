const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getUserByToken = require('./getUserByToken')
const updateUserSubscription = require('./updateUserSubscription')

module.exports = {
  register,
  login,
  logout,
  getUserByToken,
  updateUserSubscription
}
