const { Schema, model } = require('mongoose')
const Joi = require('joi')

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const usernameRegExp = /^[A-z][A-z0-9-_-\s?]{3,23}$/

const userSchema = Schema(
  {
    username: {
      type: String,
      match: usernameRegExp,
      required: [true, 'Set username for your account'],
    },
    email: {
      type: String,
      match: emailRegExp,
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
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
)

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valueOf('starter', 'pro', 'business'),
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valueOf('starter', 'pro', 'business').required(),
})

const schemas = {
  register: registerSchema,
  login: loginSchema,
  subscription: subscriptionSchema,
}

const User = model('user', userSchema)

module.exports = {
  User,
  schemas,
}