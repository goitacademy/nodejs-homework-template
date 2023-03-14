const Joi = require('joi');

const contactSchema = data =>
    Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
    }).validate(data);

module.exports = contactSchema;
