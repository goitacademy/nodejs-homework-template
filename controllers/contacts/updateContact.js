const contacts = require("../../models/contacts");
const { requestError } = require("../../helpers");

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
        throw requestError(404, "Not found");
    }
    res.status(200).json(result);
};

module.exports = updateContact;
