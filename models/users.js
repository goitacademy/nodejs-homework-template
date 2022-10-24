const { Schema, model } = require('mongoose')
const Joi = require('joi')

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/

const userSchema = Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
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
  },
  { versionKey: false, timestamps: true },
)

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required().valid('starter', 'pro', 'business'),
})

const schemas = {
  register: registerSchema,
  login: loginSchema,
  subscription: updateSubscriptionSchema,
}

const User = model('user', userSchema)

module.exports = {
  User,
  schemas,
}