const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema({
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
});

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': '{#key} is not valid',
  }),
  password: Joi.string().required(),
  subscription: Joi.any().allow('starter', 'pro', 'business'),
}).messages({
  'any.required': 'missing required {#key}',
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': '{#key} is not valid',
  }),
  password: Joi.string().required(),
});

const schema = {
  registerSchema,
  loginSchema,
};

const User = model('user', userSchema);

module.exports = { User, schema };
