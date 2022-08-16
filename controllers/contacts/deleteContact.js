const { NotFound } = require('http-errors');
const { contact: service } = require("../../service");

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await service.deleteContact(contactId);
    if (!result) {
        throw new NotFound("not found");
    };
    res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {
            result
        }
    });
};

module.exports = deleteContact;
