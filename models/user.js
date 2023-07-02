const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const subscriptionList = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'any.required': "Missing field 'email'",
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': "Missing field 'password'",
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required()
    .messages({
      'any.required': "Missing field 'subscription'",
    }),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};