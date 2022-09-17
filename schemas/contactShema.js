const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2}).required(),
    phone: Joi.string().max(12).pattern(/^[0-9]+$/).required(),
 });

module.exports = contactSchema;
