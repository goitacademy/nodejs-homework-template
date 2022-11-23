const Joi = require('joi');

const nameRegExp = /^[a-zA-Z][a-zA-Z\s]*$/;
const phoneRegExp = /^\(\d{3}\)\s?\d{3}-\d{4}$/;

const schemaPostContact = Joi.object({
    name: Joi.string()
        .pattern(nameRegExp).min(3).max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    phone: Joi.string()
        .pattern(phoneRegExp)
        .required(),
    favorite: Joi.boolean(),
});

const schemaPutContact = Joi.object({
    name: Joi.string()
        .pattern(nameRegExp).min(3).max(30),
    email: Joi.string()
        .email({ minDomainSegments: 2 }),
    phone: Joi.string()
        .pattern(phoneRegExp),
    favorite: Joi.boolean(),
});

const schemaPatchContactStatus = Joi.object({
    favorite: Joi.boolean()
        .required(),
});

module.exports = {
    schemaPostContact,
    schemaPutContact,
    schemaPatchContactStatus
};