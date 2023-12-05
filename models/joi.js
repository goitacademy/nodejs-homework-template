const Joi = require('joi');

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const addToFavorites = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { joiSchema, addToFavorites };