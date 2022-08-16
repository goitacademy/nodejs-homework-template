const { NotFound } = require('http-errors');
const { dashboard: service } = require('../../service');

const getCustomerById = async (req, res) => {
    const { customerId } = req.params;
    const result = await service.getCustomerById(customerId);
    if (!result) {
        throw new NotFound(`Customer with such id ${customerId} was not found`);
    };
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    });
};

module.exports = getCustomerById;
