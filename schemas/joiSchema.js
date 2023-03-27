const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.bool(),
});

const schemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).min(1);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = { schema, schemaUpdate, updateFavoriteSchema };
