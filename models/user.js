const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const { mailRegexp } = require('../helpers/regexp')

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
    minlength: 6
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    unique: true,
    match: mailRegexp,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null
  },
  avatarURL: {
    type: String,
    required: true
  },
}, { versionKey: false, timestamps: true })

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const joiRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().lowercase().trim().pattern(mailRegexp).required(),
  subscription: Joi.string().valid('starter', 'pro', 'business').default("starter"),
  token: Joi.string().token(),
})

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().lowercase().trim().pattern(mailRegexp).required(),
})

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').default("starter"),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
}