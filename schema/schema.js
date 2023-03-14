const Joi = require("joi");

const addContactSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^\+?[\d\s()-]+$/)
        .required(),
});

const updateContactSchema = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\+?[\d\s()-]+$/),
});

module.exports = { addContactSchema, updateContactSchema };