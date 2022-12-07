const createError = require('http-errors');

const { Contact } = require("../../model");

const deleteContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndRemove(contactId);
        if (!result) {
            throw createError(404, `UPS! Contact with id=${contactId} not found`);
        }
        res.json({
            status: "success",
            code: 200,
            message: "contact deleted",
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
};

module.exports = deleteContact;