const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");
const { addSchema } = require("../../schemas/contacts");

const updateContact = async (req, res) => {
    const { error } = addSchema.validate(req.body);

    if (error) {
        throw RequestError(400, "missing fields" );
    };

    const { contactId } = req.params;
    const data = await contacts.updateContact(contactId, req.body);

    if (!data) {
        throw RequestError(404, "Not found");
    };

    res.json(data);
};

module.exports = updateContact;