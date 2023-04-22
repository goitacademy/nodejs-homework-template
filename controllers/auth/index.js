const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./current');
const updateSubscription = require('./updateSubscription');

module.exports = {
    register,
    login,
    logout,
    getCurrent,
    updateSubscription,
};
