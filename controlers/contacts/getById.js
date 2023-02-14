const createError = require("http-errors");

const contactsOperations = require("../../models/contacts");

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contactsOperations.getContactById(contactId);

        if (!contact) {
            throw createError(404, "Not found");
        }

        res.status(200).json({
            statusCode: 200,
            message: "success",
            data: { contact },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getById;
