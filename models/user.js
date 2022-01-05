const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

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
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  // subscription: Joi.string().valid('starter', 'pro', 'business').required(),
  // token: Joi.string().required(),
})

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema
}
