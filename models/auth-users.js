import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleSaveError, preUpdate } from './hooks.js';

const userSchema = new Schema(
  {
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
    avatarURL: { type: String, require: true },
    token: String,
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

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', preUpdate);

userSchema.post('findOneAndUpdate', handleSaveError);

export const userRegisterSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required password field' }),
  email: Joi.string()
    .email()
    .required()
    .messages({ 'any.required': 'missing required email field' }),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    'any.required': 'missing required email field',
  }),
  password: Joi.string().required().messages({
    'any.required': 'missing required password field',
  }),
});

export const updateSubsctiptionSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid('starter', 'pro', 'business')
    .messages({ 'any.required': 'missing required subscription field' }),
});

export const userEmailSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ 'any.required': 'missing required field email' }),
});

const User = model('user', userSchema);

export default User;
