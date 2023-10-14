const { User } = require('./user.schema');

const createUser = async (userData) => {
    return await User.create(userData);
};

module.exports = {
    createUser,
};