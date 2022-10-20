const signup = require('./singup');
const login = require('./login');
const logout = require('./logout');
const changeSubscription = require('./changeSubscription');
const updateAvatar = require('../users/updateAvatar');

module.exports = {
    signup,
    login,
    logout,
    changeSubscription,
    updateAvatar
}