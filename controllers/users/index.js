const { registerNewUser } = require('./RegisterNewUser');
const { logInUser } = require('./LogInUser');
const { logOutUser } = require('./LogOutUser');
const { currentUser } = require('./currentUser');

module.exports = {
    registerNewUser,
    logInUser,
    logOutUser,
    currentUser
};