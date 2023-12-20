const Joi = require('joi');

exports.bodySchemaCreate = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({ 'any.required': 'missing required name field' }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({ 'any.required': 'missing required email field' }),
    phone: Joi.string()
        .min(14)
        .max(14)
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .required()
        .messages({
            'string.pattern.base': 'phone mast be (***) ***-**** format',
            'any.required': 'missing required phone field',
        }),
    favorite: Joi.boolean(),
});

exports.bodySchemaUpdate = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({ 'any.required': 'missing required name field' }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .messages({ 'any.required': 'missing required email field' }),
    phone: Joi.string()
        .min(14)
        .max(14)
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .required()
        .messages({
            'string.pattern.base': 'phone mast be (***) ***-**** format',
            'any.required': 'missing required phone field',
        }),
    favorite: Joi.boolean(),
});
