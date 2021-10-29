const register = require('./register')
const verify = require('./verify')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const avatars = require('./avatars')
const repeatEmailVerification = require('./repeatEmailVerification')

module.exports = {
  register,
  verify,
  login,
  logout,
  current,
  avatars,
  repeatEmailVerification
}
