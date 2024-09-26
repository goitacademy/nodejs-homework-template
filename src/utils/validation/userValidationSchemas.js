const Joi = require('joi');

const userRegisterJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `Missing required name field`,
    'string.empty': `Name cannot be an empty field`,
  }),
  email: Joi.string().email().required().messages({
    'any.required': `Missing required email field`,
    'string.email': `Email must be a valid email address`,
    'string.empty': `Email cannot be an empty field`,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': `Missing required password field`,
    'string.min': `Password must be at least {#limit} characters long`,
  }),
});

const userLoginJoiSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': `Missing required email field`,
    'string.email': `Email must be a valid email address`,
    'string.empty': `Email cannot be an empty field`,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': `Missing required password field`,
    'string.min': `Password must be at least {#limit} characters long`,
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .required()
    .messages({
      'any.required': 'Subscription is required',
      'string.empty': 'Subscription cannot be empty',
      'any.only': `Subscription must be one of 'starter', 'pro', 'business'`,
    }),
});

const emailJoiSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': `Missing required email field`,
    'string.email': `Email must be a valid email address`,
    'string.empty': `Email cannot be an empty field`,
  }),
});

module.exports = {
  userRegisterJoiSchema,
  userLoginJoiSchema,
  updateSubscriptionSchema,
  emailJoiSchema,
};
