const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcript = require('bcryptjs')

const emailRegexp =
  /^[a-zA-Z0-9][\w.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z.]*[a-zA-Z]$/

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
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
    }
  },
  { versionKey: false, timestamps: true }
)

userSchema.methods.setPassword = function (password) {
  this.password = bcript.hashSync(password, bcript.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcript.compareSync(password, this.password)
}

const joiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema,
}
