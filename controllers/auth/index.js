const register = require("./register")
const login = require('./login')
const getCurrent = require('./getCurrent')
const logout = require('./logout')
const setAvatar = require("./setAvatar")
const setSubscription = require("./setSubscription")

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    setAvatar,
    setSubscription
}