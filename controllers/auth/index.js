const register = require('./register')
const login = require('./login')
const getCurrent = require('./getCurrent')
const logout = require('./logout')
const updateUserSubscription = require('./updateUserSubscription')
const setAvatar = require('./setAvatar')
const verifyEmail = require('./verifyEmail')
const resendVerifyEmail = require('./resendVerifyEmail')

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  setAvatar,
  updateUserSubscription,
  verifyEmail,
  resendVerifyEmail,
}