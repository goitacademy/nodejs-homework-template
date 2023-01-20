const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const verify = require('./verify');
const resendVerifyEmail = require('./resendVerifyEmail')


module.exports = {
    register,
    login,
    logout, 
    verify,
    resendVerifyEmail}