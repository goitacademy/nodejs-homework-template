const register = require('./register')
const verify = require('./verify')
const login = require('./login')
const logout = require('./logout')
const getUserByToken = require('./getUserByToken')
const updateUserSubscription = require('./updateUserSubscription')
const updateAvatar = require('./updateAvatar')

module.exports = {
  register,
  verify,
  login,
  logout,
  getUserByToken,
  updateUserSubscription,
  updateAvatar
}
