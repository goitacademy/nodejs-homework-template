const Joi = require('joi');

const validateContacts = Joi.object({
  name: Joi.string().trim().alphanum().min(2).max(16).required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .trim()
    .min(14)
    .max(14)
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

const validateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  validateFavorite,
  validateContacts,
};

module.exports = schemas;
