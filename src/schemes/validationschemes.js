const Joi = require('joi');

const addContactSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    phone: Joi.string()
        .required()
        .min(6)
        .max(15)
});

const updateContactSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    phone: Joi.string()
        .required()
        .min(6)
        .max(15)
});

module.exports = { addContactSchema, updateContactSchema }