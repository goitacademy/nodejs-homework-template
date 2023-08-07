const { registerNewUser } = require('./RegisterNewUser');
const { logInUser } = require('./LogInUser');
const { logOutUser } = require('./LogOutUser');
const { currentUser } = require('./currentUser');
const {uploadUserAvatar} = require('./uploadUserAvatar');

module.exports = {
    registerNewUser,
    logInUser,
    logOutUser,
    currentUser,
    uploadUserAvatar
};