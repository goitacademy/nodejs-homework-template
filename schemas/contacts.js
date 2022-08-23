const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
});

const schemasFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  add: addSchema,
  updateFavorite: schemasFavorite,
};
