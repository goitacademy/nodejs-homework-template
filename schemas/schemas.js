const Joi = require("joi");

const newContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  favorite: Joi.string(),
});

const updateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.string(),
});

const favoriteContact = Joi.object({
  favorite: Joi.string().required(),
});

module.exports = {
  newContact,
  updateContact,
  favoriteContact,
};
