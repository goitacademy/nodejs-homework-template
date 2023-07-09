const { register } = require('./register');

const { login } = require('./login');

const { getCurrent } = require('./currentUser');

const { logout } = require('./logout');

const { updateSubscription } = require('./updateSubscription');

module.exports = { register, login, getCurrent, logout, updateSubscription };
