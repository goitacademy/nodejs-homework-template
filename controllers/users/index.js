const { ctrlWrapper } = require("../../utils");

const { registerNewUser } = require('./RegisterNewUser');
const { logInUser } = require('./LogInUser');
const { logOutUser } = require('./LogOutUser');
const { currentUser } = require('./currentUser');

module.exports = {
    registerNewUser: ctrlWrapper(registerNewUser),
    logInUser: ctrlWrapper(logInUser),
    logOutUser: ctrlWrapper(logOutUser),
    currentUser: ctrlWrapper(currentUser)
};