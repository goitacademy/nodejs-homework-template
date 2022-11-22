const Joi = require('joi');

const addContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required().min(6).max(15),
    favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required().min(6).max(15),
    favorite: Joi.boolean(),
});

const updateStatusSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

module.exports = { addContactSchema, updateContactSchema, updateStatusSchema };
