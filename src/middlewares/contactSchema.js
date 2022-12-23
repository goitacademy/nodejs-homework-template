const Joi = require("joi");

const contact = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
};

const createContactSchema = Joi.object({
  name: contact.name,
  email: contact.email,
  phone: contact.phone,
  favorite: contact.favorite,
});

const updateContactFavoriteSchema = Joi.object({
  favorite: contact.favorite,
});

module.exports = { createContactSchema, updateContactFavoriteSchema };
