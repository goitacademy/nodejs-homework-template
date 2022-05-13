const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: 6,
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

const joiUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().default('starter'),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiUserSchema,
  joiSubscriptionSchema,
};
