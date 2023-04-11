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

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(3).required(),
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(3).required(),
});

module.exports = { schema, schemaUpdate, updateFavoriteSchema, registerSchema, loginSchema };
