const Joi = require("joi");

const newContactAuthSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().integer().required(),
});

const editContactAuthSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    phone: Joi.number().integer(),
});

module.exports = {
    newContactAuthSchema,
    editContactAuthSchema,
};
