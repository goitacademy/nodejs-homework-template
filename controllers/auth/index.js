const register = require("./register");
const login = require("./login");
const logout = require("./logout")
const getCurrent = require("./getCurrent")
const updateAvatar = require("./updateAvatar")
const verify = require("./verify");
const resendVerifyEmail = require("./resendVerifyEmail")
module.exports = {
    register,
    login,
    logout,
    getCurrent,
    updateAvatar,
    verify,
    resendVerifyEmail,
};