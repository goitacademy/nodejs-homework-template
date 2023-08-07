const Joi = require("joi");

const validName = Joi
    .string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
    .required();

const validEmail = Joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .trim()
    .required();

const validNumber = Joi
    .string()
    .trim()
    .required();

const contactSchema = Joi.object({
    name: validName,
    
    email: validEmail,

    phone: validNumber,
});

module.exports = { contactSchema };