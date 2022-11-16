const Joi = require('joi');

const nameRegExp = /^[a-zA-Z][a-zA-Z\s]*$/;
const phoneRegExp = /^\(\d{3}\)\s?\d{3}-\d{4}/;

const schemaPostContact = Joi.object({
    name: Joi.string()
    .pattern(nameRegExp).min(3).max(30)
    .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
    phone: Joi.string()
    .pattern(phoneRegExp)
    .required()
});

const schemaPutContact = Joi.object({
    name: Joi.string()
    .pattern(nameRegExp).min(3).max(30),
    email: Joi.string()
    .email({ minDomainSegments: 2 }),
    phone: Joi.string()
    .pattern(phoneRegExp),
});

module.exports = { schemaPostContact, schemaPutContact };