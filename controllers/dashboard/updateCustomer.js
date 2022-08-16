const { NotFound } = require("http-errors");
const { dashboard: service } = require('../../service');

const updateCustomer = async (req, res) => {
    const { customerId } = req.params;
    const body = req.body;
    const { email } = req.body;
    const result = await service.updateCustomer(customerId, body);
    if (!result) {
        throw new NotFound(`Customer with such id ${customerId} was not updated. User with such email ${email} already exists.`);
    };
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    });
};

module.exports = updateCustomer;
