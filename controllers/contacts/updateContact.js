const contacts = require('../../models/contacts');
const createError = require('http-errors');
const Joi = require('joi');


const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.string().required()
});


const updateContact = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            throw new createError(400, error.message);
        }
        const { id } = req.params;
        const { name, email, phone } = req.body;
        const result = await contacts.updateContact(id, name, email, phone);
        if (!result) {
            throw new createError(400, 'Not found');
        }
        res.json(result);

    } catch (error) {
        next(error)
    }
};

module.exports = updateContact;
