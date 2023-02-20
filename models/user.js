const { Schema, model } = require('mongoose')
const Joi = require('joi')

const { handleSchemaValidationErrors } = require('../helpers')

const subscriptionPlan = ['starter', 'pro', 'business']

const userSchema = Schema(
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
      enum: subscriptionPlan,
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.post('save', handleSchemaValidationErrors)

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string().valid(...subscriptionPlan),
})

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

const schemas = {
  registerSchema,
  loginSchema,
}

const User = model('user', userSchema)

module.exports = {
  User,
  schemas,
}

// 1:00:59
