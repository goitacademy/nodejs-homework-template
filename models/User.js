import Joi from 'joi'
import { Schema, model } from 'mongoose'
import validator from 'validator'
import { addUpdateSettings, handleSaveError } from './hooks.js'

const userSchema = new Schema(
  {
    password: { type: String, required: [true, 'Set password for user'] },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    subscription: { type: String, enum: ['starter', 'pro', 'business'], default: 'starter' },
    token: String,
  },
  { versionKey: false, timestamps: true }
)

userSchema.post('save', handleSaveError)
userSchema.pre('findOneAndUpdate', addUpdateSettings)
userSchema.post('findOneAndUpdate', handleSaveError)

export const userRegisterSchema = Joi.object({
  email: Joi.string()
    .required()
    .custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.message('email is invalid')
      }
      return value
    }),
  password: Joi.string().min(8).required(),
})

export const userLoginSchema = Joi.object({
  email: Joi.string()
    .required()
    .custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.message('email is invalid')
      }
      return value
    }),
  password: Joi.string().min(8).required(),
})

export const userSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
})

export const User = model('user', userSchema)
