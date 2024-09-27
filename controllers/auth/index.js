const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail.js')

module.exports = {
    register,
    login,
    logout,
    verifyEmail,
    resendVerifyEmail,
}