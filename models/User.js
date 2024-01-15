import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { addUpdateSettings, onSaveError } from './hooks.js';

// ============================================================

const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegExp = /^[a-zA-Z0-9]{6,16}$/;
const subscriptionList = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: 'starter',
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', onSaveError);
userSchema.pre('findOneAndUpdate', addUpdateSettings);
userSchema.post('findOneAndUpdate', onSaveError);

export const userSignSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    'any.required': 'Validation Error.',
    'string.pattern.base': 'Validation Error.',
  }),
  password: Joi.string().pattern(passwordRegExp).required().messages({
    'any.required': 'Validation Error.',
    'string.pattern.base': 'Validation Error.',
  }),
});

export const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

const User = model('user', userSchema);

export default User;
