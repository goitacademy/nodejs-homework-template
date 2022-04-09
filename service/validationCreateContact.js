const Joi = require('joi');
const { regexName, regexPhone } = require('../helpers/regex');

const validationCreateContact = Joi.object({
    name: Joi.string().pattern(regexName).min(1).max(50).required().messages({
        'any.required': 'Name field is required',
        'string.empty': 'The name field cannot be empty',
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email field is required',
        'string.empty': 'The email field cannot be empty',
    }),
    phone: Joi.string().pattern(regexPhone).min(7).max(30).required().messages({
        'any.required': 'Phone field is required',
        'string.empty': 'The phone field cannot be empty',
    }),
    favorite: Joi.boolean().optional(),
});

module.exports = validationCreateContact;