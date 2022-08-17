const { NotFound } = require("http-errors");
const { dashboard: service } = require('../../service');

const deleteCustomer = async (req, res) => {
    const { customerId } = req.params;
    const result = await service.deleteCustomer(customerId);
    if (!result) {
        throw new NotFound("No customer with such id");
    };
    res.json({
        status: "success",
        code: 200,
        message: "Customer was deleted",
        data: {
            result
        }
    });
};

module.exports = deleteCustomer;
