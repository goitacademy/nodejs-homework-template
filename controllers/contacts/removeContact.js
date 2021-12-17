const contactOperations = require("../../model/contacts/");
const { NotFound } = require("http-errors");

async function removeContact(req, res) {
    const { contactId } = req.params;
    const contact = await contactOperations.removeContact(contactId);
    if (!contact) {
        throw new NotFound(`Not found`);
    }
    res.json({
        status: "Success",
        message: "Contact deleted",
        code: 200,
        data: {
            result: contact
        }
    });
};

module.exports = removeContact;