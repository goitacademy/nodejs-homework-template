const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().integer().required(),
  favorite: Joi.bool(),
});

const favoriteContactSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = { contactSchema, favoriteContactSchema };
