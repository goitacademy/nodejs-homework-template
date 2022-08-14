const signUp = require('./signUp');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSub = require('./updateSub');
const updateAvatar = require('./updateAvatar');
const verifyEmail = require('./verifyEmail');
const verifyAgain = require('./verifyAgain');
module.exports = {
    signUp,
    login,
    getCurrent,
    logout,
    updateSub,
    updateAvatar,
    verifyEmail,
    verifyAgain
}