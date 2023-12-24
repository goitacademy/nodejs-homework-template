const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const removeContact = async(req, res, next) => {
    try {
        const contactId = req.params.contactId;
        const result = await Contact.findByIdAndRemove(contactId);
        if(!result) {
            throw HttpError(404, "Not found");
        }

        res.json({message: "Contact deleted"});
    } catch (error) {
        next(error);
    }
}

module.exports = removeContact;