const { User } = require('../../models/users');

async function findUser(email) {
    return await User.findOne(email);
};

module.exports = { findUser };