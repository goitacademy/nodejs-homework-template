const { ctrlWrapper } = require("../../helpers");

const register = require("./register");

const login = require("./login");

const current = require("./current");

const logout = require("./logout");

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
}