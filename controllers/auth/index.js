const { register } = require("./register");
const { login } = require("./login");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { updateAvatar } = require("./updateAvatar");
const { resendVerifyEmail} = require("./resendVerifyEmail");
const { verifyEmail } = require("./verifyEmail")

module.exports = { register, login, getCurrent, logout, updateAvatar, resendVerifyEmail, verifyEmail };