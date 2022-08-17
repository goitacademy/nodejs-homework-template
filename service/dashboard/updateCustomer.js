const { User } = require('../../models');

const updateCustomer = async (id, body) => {
    try {
        const data = await User.findByIdAndUpdate(id, body, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = updateCustomer;
