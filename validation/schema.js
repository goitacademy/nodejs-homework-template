const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().max(22).required(),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/, "numbers")
    .min(10)
    .max(12),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactSchema, favoriteSchema };
