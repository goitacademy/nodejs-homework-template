const Joi = require("joi");

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).required(),
});

const updateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

module.exports = {
    schema,
    updateSchema,
    updateFavoriteSchema,
};
