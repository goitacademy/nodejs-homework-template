const Joi = require("joi");

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .required(),
    favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

module.exports = { contactAddSchema, contactUpdateFavoriteSchema };
