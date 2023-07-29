const avatars = require('./avatars');
const current = require('./current');
const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const resetVerify = require('./resetVerify');
const updateSubscription = require('./updateSubscription');
const verify = require('./verify');

module.exports = {
	register,
	login,
	logout,
	current,
	updateSubscription,
	avatars,
	verify,
	resetVerify,
};
