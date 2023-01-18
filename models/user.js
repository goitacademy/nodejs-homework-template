const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
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
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  subscription: Joi.string().valid(['starter', 'pro', 'business']),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(['starter', 'pro', 'business']).required(),
});

const schemas = { registerSchema, loginSchema, updateSubscriptionSchema };

const User = model('user', userSchema);

module.exports = { User, schemas };
