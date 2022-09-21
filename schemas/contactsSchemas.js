const Joi = require('joi');

const addContact = Joi.object({
    name: Joi.string()
        .min(2)
        .max(20)
        .pattern(/^[\sA-Za-z]*$/)
        .required()
        .messages({ 'string.pattern.base': 'Name must contain letters only' }),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string()
        .min(9)
        .max(15)
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .required()
        .messages({
            'string.pattern.base':
                'Phone number must match format (123) 456-7890',
        }),
});

const updateContact = Joi.object({
    name: Joi.string()
        .min(2)
        .max(20)
        .pattern(/^[\sA-Za-z]*$/)
        .messages({ 'string.pattern.base': 'Name must contain letters only' }),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.string()
        .min(9)
        .max(15)
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .messages({
            'string.pattern.base':
                'Phone number must match format (123) 456-7890',
        }),
}).or('name', 'email', 'phone');

module.exports = { addContact, updateContact };
