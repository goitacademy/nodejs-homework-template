
const { register } = require('./auth');
const { login } = require('./auth');
const { getCurrent } = require('./auth');
const { logout } = require('./auth');

module.exports = {
    register,
    login,
    getCurrent,
    logout,
};
