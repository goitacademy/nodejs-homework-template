const current = require('./current')
const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const updateCurrentUserSubscription = require('./updateCurrentUserSubscription.js')
const updateUserAvatar = require('./updateUserAvatar')

module.exports = {
  current,
  login,
  logout,
  register,
  updateCurrentUserSubscription,
  updateUserAvatar
}
