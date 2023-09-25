const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.string().trim().required().messages({ 'any.required': 'missing required "name" field' }),
    email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'de', 'ua'] } }).required().messages({ 'any.required': 'missing required "email" field' }),
    phone: Joi.string().trim().min(10).required().messages({ 'any.required': 'missing required "phone" field' }),
    favorite: Joi.boolean(),
});

const favorite = Joi.object({
    favorite: Joi.boolean().required().messages({ 'any.required': 'missing field "favorite"' }),
});

module.exports = {
    addSchema,
    favorite,
};