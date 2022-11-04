const signup = require('./signup')
const login = require('./login')
const current = require('./getCurrent')
const logout = require('./logout')
const updateSubscription = require('./updateSubscription.js')

module.exports = {
  signup,
  login,
  current,
  logout,
  updateSubscription,
}
