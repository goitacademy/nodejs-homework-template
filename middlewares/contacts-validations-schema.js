const Joi = require('joi')

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(40)
        .required()
        .messages({
    'any.required': 'missing required name field'
  }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'any.required': 'missing required email field'
        }),
    phone: Joi.string()
        .min(3)
        .max(40)
        .required()
        .messages({
        'any.required': 'missing required phone field'
        }),
})

module.exports = { schemaCreateContact }