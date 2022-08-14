const signup = require('./signup')
const login = require("./login")
const getCurrent = require('./getCurrent')
const logout = require("./logout")
const updateAvatar = require("./updateAvatar")
const verifyEmail = require("./vertifyEmail")
const verify = require("./verify")
module.exports = {
    signup,
    login,
    getCurrent,
    logout,
    updateAvatar,
    verifyEmail,
    verify
}