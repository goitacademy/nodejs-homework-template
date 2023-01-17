const Contact = require("../../models/contacts");
const HttpError = require("../../helpers");

const updateStatusContact = async(req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (!req.body) {
        throw HttpError("missing field favorite");
    }
    const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(200, result);
}

module.exports = updateStatusContact;