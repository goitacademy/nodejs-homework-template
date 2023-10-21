const register = require('./registr')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const updateAvatar = require('./updateAvatar')
const updateSubscription = require('./updateSubscription')

module.exports = {
    register,
    login,
    logout,
    current,
    updateAvatar,
    updateSubscription
}