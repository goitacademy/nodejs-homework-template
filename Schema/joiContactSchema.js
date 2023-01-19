const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(10).max(23),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().valid(true, false),
});

module.exports = {
  joiSchema,
  favoriteSchema,
};
