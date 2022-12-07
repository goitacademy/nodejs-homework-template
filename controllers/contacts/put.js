const createError = require('http-errors');

const { Contact } = require("../../model");

const updateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
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