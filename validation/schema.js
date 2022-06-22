const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().max(22).required(),
  email: Joi.string().pattern(
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
  ),
  phone: Joi.string()
    .pattern(/^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/, "numbers")
    .min(12)
    .max(20),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactSchema, favoriteSchema };
