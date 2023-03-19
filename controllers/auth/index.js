const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getCurrent = require('./getCurrent')
const updateSubscriptionById = require('./updateSubscriptionById')


module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscriptionById,
}