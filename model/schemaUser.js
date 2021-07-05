const mongoose = require('mongoose')
const bсrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { Schema, model } = mongoose

const user = new Schema({
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
  idCloudAvatar: {
    type: String,
    default: null
  }
})

user.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bсrypt.hash(this.password, bсrypt.genSaltSync(10))
  next()
})

user.methods.validPassword = async function (password) {
  return await bсrypt.compare(password, this.password)
}

const Users = model('user', user)

module.exports = Users
