const jwt = require('jsonwebtoken');

const User = require('../../models/auth')
const { NotAutorizedError } = require('../../helpers/errors')


const getCurrentUser = async (tokenType, token) => {
    if (!token) {
        throw new NotAutorizedError('Not authorized')
    }

    const user = jwt.decode(token, process.env.JWT_SECRET)
    if (!user) {
        throw new NotAutorizedError('Not authorized')
    }

    const { _id } = user;
    const { email, subscription } = await User.findOne({ _id });

    return { email, subscription };
}

module.exports = getCurrentUser