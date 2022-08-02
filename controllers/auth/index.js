const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateUserSubscription = require('./updateUserSubscription');
const setAvatar = require('./setAvatar');

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateUserSubscription,
    setAvatar,
}