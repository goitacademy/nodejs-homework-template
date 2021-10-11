const { signup } = require('./signup')
const login = require('./login')
const { logout } = require('./logout')
const { current } = require('./current')
const avatars = require('./avatars')

module.exports = {
  signup,
  login,
  logout,
  current,
  avatars
}
