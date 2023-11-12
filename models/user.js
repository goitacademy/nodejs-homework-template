const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../utils');

const options = { versionKey: false, timestamps: true };
const subscriptionValues = ['starter', 'pro', 'business'];

const userSchema = new Schema(
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
      enum: subscriptionValues,
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  options
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required password field' }),
  email: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required email field' }),
});

const loginSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required password field' }),
  email: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required email field' }),
});

const updateSubscriptionUserSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionValues)
    .required()
    .messages({
      'any.required': 'missing field subscription',
      'any.only': 'subscription must be one of starter, pro or business',
    }),
});

const User = model('user', userSchema);

module.exports = {
  User,
  registerSchema,
  loginSchema,
  updateSubscriptionUserSchema,
};
