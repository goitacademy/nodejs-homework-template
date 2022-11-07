const contacts = require("../../models/contacts");
const {HttpError} = require("../../helpers");

const remove = async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const result = await contacts.removeContact(contactId);
        if (!result) {
            throw HttpError(404);
        }
        res.json({"message": "contact deleted"});
    } catch (error) {
        next(error)
    }
}

module.exports = remove;