const Joi = require("joi");

const contact = {
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default("false").optional(),
};

const createContactSchema = Joi.object({
  name: contact.name,
  email: contact.email,
  phone: contact.phone,
  favorite: contact.favorite,
}).required();

const updateContactSchema = Joi.object({
  name: contact.name.optional(),
  email: contact.email.optional(),
  phone: contact.phone.optional(),
  favorite: contact.favorite,
}).required();

const contactFavoriteSchema = Joi.object({
  favorite: contact.favorite.required(),
});

module.exports = {
  createContactSchema,
  updateContactSchema,
  contactFavoriteSchema,
};
