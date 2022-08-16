const { User } = require('../../models');

const deleteCustomer = async (id) => {
    try {
        const data = await User.findByIdAndRemove(id);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = deleteCustomer;
