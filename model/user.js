const { Schema, model } = require('mongoose')
const Joi = require('joi')

const nameRegexp = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/
// eslint-disable-next-line
const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/

const joiSchema = Joi.object({
  name: Joi.string().min(2).pattern(nameRegexp).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk', 'org', 'ca'] },
    })
    .pattern(emailRegexp)
    .required(),
})
const userSchema = Schema({
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
})
const User = model('user', userSchema)
module.exports = { User, joiSchema }
