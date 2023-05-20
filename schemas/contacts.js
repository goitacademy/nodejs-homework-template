const Joi = require('joi');

/**
 * Required formats:
 * @param {string} name any characters available,
 * @param {string} email default email format - "name@mail.com",
 * @param {string} phone available formats:
 * (012) 123 45 67, (012)-123-45-67, (012) 123-4567, (012)1234567
 * @param {boolean} favorite true/false
 */
const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/)
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { addContactSchema, updateFavoriteSchema };

module.exports = schemas;
