const { NotFound } = require('http-errors');
const { contact: service } = require("../../service");

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await service.getContactById(contactId);
    if (!result) {
        throw new NotFound("Not found");
    };
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    });
};

module.exports = getContactById;
