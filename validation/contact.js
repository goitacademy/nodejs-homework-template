const Joi = require("joi");

const contactShema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

const favoriteSchemaUpdate = Joi.object({
    favorite: Joi.boolean().required(),
});

module.exports = { contactShema, favoriteSchemaUpdate };