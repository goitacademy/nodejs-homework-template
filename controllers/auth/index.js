const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');
const updateAvatare = require('./updateAvatare');
const verify = require('./verify');
const resendVerifyEmail = require('./resendVerifyEmail')

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateSubscription,
    updateAvatare,
    verify,
    resendVerifyEmail,
}