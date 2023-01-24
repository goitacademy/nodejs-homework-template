const Joi = require("joi");

const newContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().pattern(/^(\(\d{3}\))\s?(\d{3}-\d{4})$/).required(),
    email: Joi.string().email(),
    favorite: Joi.boolean(),
});
const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    phone: Joi.string().pattern(/^(\(\d{3}\))\s?(\d{3}-\d{4})$/),
    email: Joi.string().email(),
    favorite: Joi.boolean(),
});
const favoriteContactSchema = Joi.object({
    favorite: Joi.boolean().required(),
});
module.exports = {
    newContactSchema,
    updateContactSchema,
    favoriteContactSchema
}