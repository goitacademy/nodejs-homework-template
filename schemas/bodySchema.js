const Joi = require('joi');
const { regexp } = require('../vars');

exports.bodySchemaCreate = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({ 'any.required': 'missing required name field' }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .pattern(regexp.email)
        .required()
        .messages({ 'any.required': 'missing required email field' }),
    phone: Joi.string()
        .min(14)
        .max(14)
        .pattern(regexp.phone)
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
        .pattern(regexp.email)
        .messages({ 'any.required': 'missing required email field' }),
    phone: Joi.string()
        .min(14)
        .max(14)
        .pattern(regexp.phone)
        .required()
        .messages({
            'string.pattern.base': 'phone mast be (***) ***-**** format',
            'any.required': 'missing required phone field',
        }),
    favorite: Joi.boolean(),
});
