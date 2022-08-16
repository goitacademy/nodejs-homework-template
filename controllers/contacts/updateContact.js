const { NotFound } = require('http-errors');
const { contact: service } = require("../../service");

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await service.updateContact(contactId, req.body);
    if (!result) {
        throw new NotFound("not found");
    };
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    });
};

module.exports = updateContact;
