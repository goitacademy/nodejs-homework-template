const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSaveErrors } = require('../helpers');

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const subscriptionStatus = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    email: {
      type: String,
      // validate email
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      // validate length password
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: subscriptionStatus,
      default: 'starter',
    },
    token: { type: String, default: '' },
  },
  { versionKey: false }
);

userSchema.post('save', handleSaveErrors);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ 'string.min': 'Password length must be at least 6 characters long' }),
  subscription: Joi.string()
    .valid(...subscriptionStatus)
    .error(new Error('Subscription must be one of [starter, pro, business]')),
  // .messages({ 'string.valid': 'Subscription must be one of [starter, pro, business]' }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ 'string.min': 'Password length must be at least 6 characters long' }),
});

const updateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionStatus)
    .error(new Error('Subscription must be one of [starter, pro, business]')),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscription,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
