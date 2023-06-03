const { ctrlWrapper } = require('../../decorators');
const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateUserSubscription = require('./updateUserSubscription');
const updateAvatar = require('./updateAvatar');

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateUserSubscription: ctrlWrapper(updateUserSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
}