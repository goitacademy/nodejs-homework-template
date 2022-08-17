const { dashboard: service } = require('../../service');

const getAllCustomers = async (req, res) => {
    const customers = await service.getAllCustomers();
    res.json({
        status: "success",
        code: 200,
        data: {
            result:customers
        }
    });
};

module.exports = getAllCustomers;


