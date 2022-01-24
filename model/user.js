const { Schema, model } = require('mongoose')
const Joi = require('joi')

// eslint-disable-next-line
const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/
const passwordRegExp = /^[a-zA-Z0-9]{3,30}$/

const joiRegisterSchema = Joi.object({
  password: Joi.string().pattern(passwordRegExp).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk', 'org', 'ca'] },
    })
    .pattern(emailRegexp)
    .required(),
  subscription: Joi.string(),
  // image: Joi.string(),
})

const joiLoginSchema = Joi.object({
  password: Joi.string().pattern(passwordRegExp).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk', 'org', 'ca'] },
    })
    .pattern(emailRegexp)
    .required(),
})
//
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
    avatarURL: {
      type: String,
      default: '',
    },

    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
)
const User = model('user', userSchema)
module.exports = { User, joiRegisterSchema, joiLoginSchema }
