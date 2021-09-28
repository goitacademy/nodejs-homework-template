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

const joiUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string(),
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = model('user', userSchema)

module.exports = { User, joiUserSchema }
