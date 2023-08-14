const { registerNewUser } = require('./RegisterNewUser');
const { logInUser } = require('./LogInUser');
const { logOutUser } = require('./LogOutUser');
const { currentUser } = require('./currentUser');
const {uploadUserAvatar} = require('./uploadUserAvatar');
const {verificationEmail} = require('./verificationEmail');
const {resendVerifyEmail} = require('./resendVerifyEmail');

module.exports = {
    registerNewUser,
    logInUser,
    logOutUser,
    currentUser,
    uploadUserAvatar,
    verificationEmail,
    resendVerifyEmail
};