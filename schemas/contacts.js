const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.string().required().messages({ 'any.required': 'missing required "name" field' }),
    phone: Joi.string().required().messages({ 'any.required': 'missing required "phone" field' }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'de', 'ua'] } }).required().messages({ 'any.required': 'missing required "email" field' }),
});

module.exports = {
    addSchema,
};