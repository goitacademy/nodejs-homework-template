const { Contact } = require("../../models/");
const { NotFound } = require("http-errors");

async function updateStatusContact(req, res) {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (!contactId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new NotFound("Not found");
    }
    const contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    if (!contact) {
        throw new NotFound(`Not found`);
    }
    res.json({
        status: "Success",
        code: 200,
        data: {
            result: contact
        }
    });
}

module.exports = updateStatusContact;