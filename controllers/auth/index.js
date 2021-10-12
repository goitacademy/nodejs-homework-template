const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getUserByToken = require('./getUserByToken')

module.exports = {
  register,
  login,
  logout,
  getUserByToken
}