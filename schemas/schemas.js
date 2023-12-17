const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().min(3).alphanum().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().integer(6).required(),
    favorite:Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
};

module.exports = {schemas};
