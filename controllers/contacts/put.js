const Joi = require('joi');
const createError = require('http-errors');
const contactsOperations = require("../../models/contacts");

const contactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required(),
    phone: Joi.number().min(7).required(),
});

const updateContact = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
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