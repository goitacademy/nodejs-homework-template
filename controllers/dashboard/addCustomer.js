const bcrypt = require('bcryptjs');
const { Conflict } = require("http-errors");
const { dashboard: service } = require('../../service');

const addCustomer = async (req, res) => {
    const { password, email, subscription, token, role } = req.body;
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = await service.onAddCustomerFind({ email });
    if (user) {
        throw new Conflict(`User with such email ${email} already exists`);
    }
    await service.onAddCustomerCreate({
        hashPassword,
        email,
        subscription,
        token,
        role
    });
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            email,
            subscription,
            role
        }
    });
};

module.exports = addCustomer;
