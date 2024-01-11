const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.string(),
});

const addFavoriteSchema = Joi.object({
  favorite: Joi.string().required(),
});

module.exports = { addSchema, addFavoriteSchema };
