const { model } = require('mongoose');

const { user } = require('./schemas');
const { schemaUser } = user;
// const {
//   user: { userSchema },
// } = require('./schemas');
const User = model('user', schemaUser);

module.exports = User;
