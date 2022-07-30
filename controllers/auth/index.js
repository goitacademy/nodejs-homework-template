const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateUserSubscription = require('./updateUserSubscription')

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateUserSubscription,
}