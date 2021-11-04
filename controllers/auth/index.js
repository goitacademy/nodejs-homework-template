/* eslint-disable no-tabs */
const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const currentUser = require('./currentUser')
const updateSubscription = require('./updateSubscription')

module.exports = {
    register,
    login,
    logout,
		currentUser,
		updateSubscription
}
