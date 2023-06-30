const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const addSchemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  addSchemaFavorite,
};
