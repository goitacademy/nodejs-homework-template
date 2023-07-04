const Joi = require('joi');

const authSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

module.exports = { authSchema, subscriptionSchema };
