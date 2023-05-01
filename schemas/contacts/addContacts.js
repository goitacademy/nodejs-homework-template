const Joi = require('joi');

const addContactSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Missing required name field',
    }),
    email: Joi.string().email().lowercase().required().messages({
        'any.required': 'Missing required email field',
        'string.email': 'Invalid email format',
    }),
    phone: Joi.string()
        .regex(/^[0-9 ()-]+$/)
        .required()
        .messages({
            'any.required': 'Missing required phone field',
            'string.pattern.base': 'Invalid phone format',
        }),
});

module.exports = addContactSchema;
