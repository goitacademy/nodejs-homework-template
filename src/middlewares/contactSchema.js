const Joi = require("joi");

const contact = {
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
};

const createContactSchema = Joi.object({
  name: contact.name,
  phone: contact.phone,
  email: contact.email,
  favorite: contact.favorite,
});

const updateContactFavoriteSchema = Joi.object({
  favorite: contact.favorite,
});

module.exports = { createContactSchema, updateContactFavoriteSchema };
