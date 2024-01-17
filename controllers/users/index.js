const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const currentUser = require('./currentUser')
const updateBySubscription = require('./updateBySubscription')

module.exports = {
    register,
    login,
    logout,
    currentUser,
    updateBySubscription,
}