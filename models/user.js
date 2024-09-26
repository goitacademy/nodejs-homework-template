const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSaveErrors } = require('../helpers');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
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
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveErrors);

const registerSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().required(),
  password: Joi.string().required(),
});

const updateSubscription = Joi.object({
  subscription: Joi.string()
    .trim()
    .valid('starter', 'pro', 'business')
    .required(),
});

const joiUserSchema = {
  registerSchema,
  loginSchema,
  updateSubscription,
};

const User = model('user', userSchema);

module.exports = {
  User,
  joiUserSchema,
};
