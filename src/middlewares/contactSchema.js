const Joi = require("joi");

const contact = {
  name: Joi.string().min(3).required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  favorite: Joi.boolean().optional(),
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
