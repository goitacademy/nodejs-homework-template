const Joi = require('joi');

const addContactSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2).max(20)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    phone: Joi.string()
        .min(9).max(15)
        .pattern(/^[-\s()0-9]*$/).required()
        .messages({ 'string.pattern.base': 'Phone must contain numbers, dash and parentheses only' })
})

const updateContactSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2).max(20),
    email: Joi.string()
        .email({ minDomainSegments: 2 }),
    phone: Joi.string()
        .min(9).max(15)
        .pattern(/^[-\s()0-9]*$/)
        .messages({ 'string.pattern.base': 'Phone must contain numbers, dash and parentheses only' })
}).or('name', 'email', 'phone')

module.exports = {addContactSchema, updateContactSchema}