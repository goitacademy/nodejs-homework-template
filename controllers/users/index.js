const signup = require('./signup');
const login = require('./login');
const logout = require('./logout.js');
const getCurrent = require('./getCurrent ');
const patchSubscription = require('./patchSubscription');

module.exports = {
    signup,
    login,
    logout,
    getCurrent,
    patchSubscription
}