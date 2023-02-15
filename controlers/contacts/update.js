const createError = require("http-errors");

const contactsOperations = require("../../models/contacts");

const update = async (req, res, next) => {
    try {
        const { contactId } = req.params;

        const updateContact = await contactsOperations.updateContact(
            contactId,
            req.body
        );

        if (!updateContact) {
            throw createError(404, "Not found");
        }

        res.status(200).json({
            statusCode: 200,
            message: "contact updated",
            data: { ...updateContact },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = update;
