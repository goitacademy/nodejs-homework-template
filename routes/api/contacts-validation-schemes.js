const Joi = require('joi');

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .messages({
            'any.required': 'Поле Name обязательное', 
            'string.empty': 'Поле Name не может быть пустым'
        })
        .required(),

    phone: Joi.string()
        .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
        .messages({
            'any.required': 'Поле Phone обязательное',
            'string.empty': 'Поле Phone не может быть пустым'
        })
        .required(),


    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
        .messages({
            'any.required': 'Поле Email обязательное',
            'string.empty': 'Поле Email не может быть пустым'
        })
        .required()
})

const schemaUpdateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .messages({
            'any.required': 'Поле Name обязательное', 
            'string.empty': 'Поле Name не может быть пустым'
        })
        .optional(),

    phone: Joi.string()
        .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
        .messages({
            'any.required': 'Поле Phone обязательное',
            'string.empty': 'Поле Phone не может быть пустым'
        })
        .optional(),


    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
        .messages({
            'any.required': 'Поле Email обязательное',
            'string.empty': 'Поле Email не может быть пустым'
        })
        .optional()
})

module.exports = {schemaCreateContact, schemaUpdateContact}