const signupUser = require('./signup');
const loginUser = require('./login');
const logoutUser = require('./logout');
const currentUser = require('./currentUser');
const updateSubscriptionUser = require('./updateSubscriptionUser');
const updateAvatar = require('./updateAvatar');

module.exports = { signupUser, loginUser, logoutUser, currentUser, updateSubscriptionUser, updateAvatar };
