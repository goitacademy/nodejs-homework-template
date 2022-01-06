const getCurrent = require('./getCurrent')
const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const updateAvatar = require('./updateAvatar')
const verifyEmail = require('./verifyEmail')

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  updateAvatar,
  verifyEmail
}
