const Joi = require('joi');

const contactsAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
});

module.exports = {
    add: contactsAddSchema
}