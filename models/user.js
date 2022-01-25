const { Schema, model } = require('mongoose');
const Joi = require('joi');

// eslint-disable-next-line
const emailRegExp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

const joiUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegExp).required(),
});

const joiUpdSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const userSchema = Schema(
  {
    password: {
      type: String,
      minLength: 6,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegExp,
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
    avatarURL: {
      type: String,
      default: 'avatars/testpic.png',
    },
  },
  { versionKey: false, timestamps: true },
);

const User = model('user', userSchema);

module.exports = { User, joiUserSchema, joiUpdSubscriptionSchema };
