/* eslint-disable indent */
/* eslint-disable eol-last */
const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const getUser = require('./getUser')
const updateSubscription = require('./updateSubscription')

module.exports = {
    signup,
    login,
    logout,
    getUser,
    updateSubscription
}