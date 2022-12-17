const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const updateContact = async (req, res, next) => {

        const { contactId } = req.params;
        const result = await contacts.updateContact(contactId, req.body);
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json(result);
};

module.exports = updateContact;