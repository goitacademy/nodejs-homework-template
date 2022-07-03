const register = require("./register");
const getCurrentUser = require("./getCurrentUser");
const login = require("./login");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const changeAvatar = require("./changeAvatar");

module.exports = {
    register,
    updateSubscription,
    logout,
    login,
    getCurrentUser,
    changeAvatar,
};