const { Schema, model } = require('mongoose');
/** liba for data typing */
const Joi = require('joi');

const { handleSaveError } = require('../helpers');

/** Schema db  */
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
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      required: [true, 'Avatar is required'],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('seve', handleSaveError);

/** like type script typing data */
const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  avatarUrl: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});

const Schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  emailSchema,
};
/** our model */
const User = model('user', userSchema);

module.exports = {
  User,
  Schemas,
};
