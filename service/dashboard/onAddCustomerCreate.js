const { User } = require('../../models');

const onAddCustomerCreate = async ({
    hashPassword, email, subscription, token, role
}) => {
    try {
        const data = await User.create({
            password: hashPassword,
            email,
            subscription,
            token,
            role
        });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = onAddCustomerCreate;
