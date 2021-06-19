const mongoose = require('mongoose')
const { Schema, model } = mongoose

const user = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter'
    },
    token: {
      type: String,
      default: null
    }
  },
  { versionKey: false }
)

const Users = model('user', user)

module.exports = Users
