const register = require('./register')
const login = require('./login')
const currentUser = require('./currentUser')
const logout = require('./logout')
const setAvatar = require('./setAvatar')
const verifyEmail = require('./verifyEmail')
const resendVerifyEmail = require('./resendVerifyEmail')

module.exports = {
    register,
    login,
    currentUser,
    logout,
    setAvatar,
    verifyEmail,
    resendVerifyEmail
}