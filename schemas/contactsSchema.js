const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(2).required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactsSchema, updateFavoriteSchema };
