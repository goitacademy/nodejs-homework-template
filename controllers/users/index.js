const ctrlWrapper = require('../../helpers/ctrlWrapper');
const getCurrent = require('./getCurrent');
const logOut = require('./logOut');
const loginUser = require('./loginUser');
const registerUser = require('./registerUser');
const subscriptionUpdate = require('./subscriptionUpdate');
const updateAvatar = require('./updateAvatar');


module.exports = {
    registerUser: ctrlWrapper(registerUser),
    loginUser: ctrlWrapper(loginUser),
    getCurrent: ctrlWrapper(getCurrent),
    logOut: ctrlWrapper(logOut),
    subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
    updateAvatar: ctrlWrapper(updateAvatar),
}