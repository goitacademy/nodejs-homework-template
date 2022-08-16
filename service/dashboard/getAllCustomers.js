const { User } = require('../../models');

const getAllCustomers = async () => {
    try {
        const data = await User.find({});
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = getAllCustomers;
