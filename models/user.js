const { model } = require('mongoose');

const { userShema } = require('./schemas');

const User = model('user', userShema);

module.exports = User;
