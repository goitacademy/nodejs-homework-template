const { register } = require('./register');

const { login } = require('./login');

const { getCurrent } = require('./currentUser');

module.exports = { register, login, getCurrent };
