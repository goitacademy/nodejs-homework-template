const Joi = require('joi');
const {
  emailRegexp,
  subscriptionEnums,
} = require('../constants/schemaCommons');

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptionEnums),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionEnums)
    .required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateSchema,
};
