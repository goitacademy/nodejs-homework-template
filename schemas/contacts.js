const Joi = require('joi');

const contactSchema = Joi.object({
    name: Joi.required(),
    email: Joi.required(),
    phone: Joi.required(),
});

module.exports = contactSchema;