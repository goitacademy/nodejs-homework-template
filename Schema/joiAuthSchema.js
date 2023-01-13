const Joi = require('Joi');

const joiSingupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  name: Joi.string().required(),
  subscription: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

module.exports = { joiSingupSchema, joiLoginSchema, joiSubscriptionSchema };
