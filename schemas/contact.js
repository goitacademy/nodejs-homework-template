const Joi = require("joi");

const contactJoiSchema = Joi.object({
  name: Joi.string().min(3).max(10).required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  email: Joi.string().email().required(),
  favorite: Joi.boolean().required(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactJoiSchema, favoriteJoiSchema };
