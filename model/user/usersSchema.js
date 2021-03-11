const mongoose = require('mongoose')
const { Schema, model } = mongoose
const bcrypt = require('bcryptjs')
const { SALT, Subscription } = require('../../helpers/constants')

const usersSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    validate(value) {
      const regular = /\S+@\S+\.\S+/
      return regular.test(String(value).toLowerCase())
    }
  },
  password: {
    type: String,
    required: [true, 'Password required']
  },
  subscription: {
    type: String,
    enum: {
      values: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
      message: 'It is not allowed'
    },
    default: Subscription.FREE
  },
  name: {
    type: String,
    default: 'User'
  },
  token: {
    type: String,
    default: null
  }
}, { versionKey: false, timestamps: true })

usersSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', usersSchema)

module.exports = User
