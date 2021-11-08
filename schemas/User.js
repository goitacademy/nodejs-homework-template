const { Schema, model } = require('mongoose')
const { regex } = require('../helpers')

const UserSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: regex.emailRegex
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6
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
  }, {
    versionKey: false,
    timestamps: true
  }
)

const User = model('_user', UserSchema)

module.exports = User
