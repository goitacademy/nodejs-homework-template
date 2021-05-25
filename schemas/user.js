const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')
const { Subscription } = require('../helpers/constants')
const SALT_FACTOR = 7

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      default: 'Guest',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const regExp = /\S+@\S+\.\S+/gi
        return regExp.test(String(value).toLowerCase())
      },
    },
    subscription: {
      type: String,
      enum: [Subscription.starter, Subscription.pro, Subscription.business],
      default: Subscription.starter,
    },
    token: {
      type: String,
      default: null,
    },
  },

  { versionKey: false, timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User
