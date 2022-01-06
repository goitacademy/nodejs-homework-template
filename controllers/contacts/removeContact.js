const { Contact } = require("../../models/");
const { NotFound } = require("http-errors");

async function removeContact(req, res) {
    const { contactId } = req.params;
    if (!contactId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new NotFound("Not found");
    }
    const contact = await Contact.findByIdAndRemove(contactId);
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