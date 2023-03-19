const User = require('../../models/auth')


const getCurrentUser = async (_id) => {
    const { email, subscription } = await User.findOne({ _id });

    return { email, subscription };
}

module.exports = getCurrentUser