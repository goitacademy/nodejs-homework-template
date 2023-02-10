const { User } = require('../../models/users');

async function createUser(userData) {
    const { email, password, subscription  } = userData;
    return await User.create({ email, password, subscription });
};

module.exports = { createUser };