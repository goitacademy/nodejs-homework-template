const Joi = require('joi');

const contactAddSchema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
});

module.exports = contactAddSchema;
