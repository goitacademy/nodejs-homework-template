const createError = require('http-errors');
const contactsOperations = require("../../models/contacts");

const updateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contactsOperations.updateContact(contactId, req.body);
        if (!result) {
            throw createError(404, `UPS! Contact with id=${contactId} not found`);
        }
        res.json({
            status: "success",
            code: 200,
            data: {
                result
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateContact;