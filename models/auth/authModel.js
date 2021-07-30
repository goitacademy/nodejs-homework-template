const { model } = require('mongoose');
const authSchema = require('./authSchema');

const User = model('user', authSchema);

module.exports = User;
