const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
  },
  { versionKey: false },
);

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': '{#key} is not valid',
  }),
  password: Joi.string().required(),
  subscription: Joi.string().valid('starter', 'pro', 'business').messages({
    'any.only': "{#key} must be one of ['starter', 'pro', 'business']",
  }),
}).messages({
  'any.required': 'missing required {#key}',
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': '{#key} is not valid',
  }),
  password: Joi.string().required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required().messages({
    'any.only': "{#key} must be one of ['starter', 'pro', 'business']",
    'any.required': 'missing required {#key}',
  }),
});

const schema = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
};

const User = model('user', userSchema);

module.exports = { User, schema };
