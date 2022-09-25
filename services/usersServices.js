const User = require('../models/user');
// const RequestError = require('../helpers/RequestError');

const register = async user => {
    const result = await User.create(user);
    return result;
};

module.exports = {
    register,
};
