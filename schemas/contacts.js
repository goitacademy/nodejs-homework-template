const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().trim(true).required(),
  email: Joi.string().email().trim(true).required(),
  phone: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactsSchema, updateFavoriteSchema };