const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/
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
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: ''
  },
})
userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}
// ****For the situation when registration and Login require different sets of fields - two different joi schemes might be used.
// const joiRegisterSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().pattern(emailRegexp).required(),
//   password: Joi.string().min(6).required()
// })

const joiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required()
})

const patchSubscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  patchSubscriptionJoiSchema,
  joiSchema,
}