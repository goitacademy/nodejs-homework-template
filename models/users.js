const { Schema, model } = require('mongoose')
const Joi = require('joi')

const userSchema = Schema(
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
    avatarURL: {
      type: String,
      required: true,
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
  { versionKey: false, timestamps: true },
)

const joiSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  subscription: Joi.string(),
  token: Joi.string(),
})

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
})

const User = model('user', userSchema)

module.exports = { User, joiSignupSchema, joiLoginSchema }
