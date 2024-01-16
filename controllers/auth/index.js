const { ctrlWrapper } = require("../../helpers/index.js");
const register = require('./register.js');
const login = require('./login.js');
const getCurrent = require('./getCurrent.js');
const logout = require('./logout.js');
const updateUserSubscription = require('./updateUserSubscription.js');
const updateAvatar = require('./updateAvatar.js');

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateUserSubscription: ctrlWrapper(updateUserSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
}