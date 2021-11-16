const { Schema, model } = require('mongoose')

const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = Schema({

  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: emailRegexp
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  token: {
    type: String,
    default: null,
  },

}, { versionKey: false, timestamps: true })

const User = model('user', userSchema)

module.exports = User
