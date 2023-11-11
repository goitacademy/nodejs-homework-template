const Joi = require("joi");

const newContacts = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const editContacts = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  newContacts,
  editContacts,
  favoriteSchema,
};