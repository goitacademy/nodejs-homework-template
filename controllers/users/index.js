const { ctrlWrapper } = require("../../helpers/index.js");
const register = require('./register.js');
const login = require('./login.js');
const getCurrent = require('./getCurrent.js');
const logout = require('./logout.js');
const updateSubscription = require('./updateSubscription.js');

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription)
}