const mongoose = require('mongoose')
const { Schema, model } = mongoose
const bCrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')

const userSchema = new Schema(
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
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true)
      }
    },
    verify: {
      type: Boolean,
      default: false
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
      default: nanoid()
    }
  },
  { versionKey: false, timestamps: true }
)

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6))
}

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
