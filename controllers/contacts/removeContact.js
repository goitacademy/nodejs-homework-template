const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");
const removeContact = async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const result = await contactsOperations.removeContact(contactId);

        if (!result) {
            throw createError(404, "Not found");
        }
        res.status(200).json({
                message: "contact deleted",
            }
        );

    } catch (error) {
        next(error);
    }
}

module.exports = removeContact;