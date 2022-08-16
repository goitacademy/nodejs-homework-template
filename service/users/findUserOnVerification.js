const { User } = require('../../models');

const findUserOnVerification = async ({ token }) => {
    try {
        const data = await User.findOne({ token });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = findUserOnVerification;
