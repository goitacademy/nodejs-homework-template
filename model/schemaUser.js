const mongoose = require('mongoose')
const bсrypt = require('bcryptjs')
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

user.pre('save', async function () {
  if (this.isNew) {
    this.password = await bсrypt.hash(this.password, 10)
  }
})

user.methods.validPassword = async function (password) {
  return await bсrypt.compare(password, this.password)
}

const Users = model('user', user)

module.exports = Users
