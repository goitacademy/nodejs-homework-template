const createError = require("http-errors");

const contactsOperations = require("../../models/contacts");

const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;

        const deleteContact = await contactsOperations.removeContact(contactId);

        if (!deleteContact) {
            throw createError(404, "Not found");
        }

        res.status(200).json({
            statusCode: 200,
            message: "contact deleted",
            data: { ...deleteContact },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = remove;
