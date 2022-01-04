const contactOperations = require("../../model/contacts/");
const { NotFound } = require("http-errors");

async function getById(req, res) {
    const { contactId } = req.params;
    const contact = await contactOperations.getContactById(contactId);
    if (!contact) {
        throw new NotFound("Not found");
    }
    res.json({
        status: "Success",
        code: 200,
        data: {
            result: contact
        }
    })
};

module.exports = getById;