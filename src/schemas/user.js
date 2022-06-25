const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const bcrypt = require('bcryptjs')

const { SUBSCRIPTION_TYPE } = require('./../helpers/constants')
const SALT_FACTOR = 8

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [
        /^\w+([\-]?\w+)*@\w+([\-]?\w+)*(\.\w{2,3})+$/ /* eslint-disable-line */,
        'Please fill a valid email address',
      ],
      unique: true,
    },
    subscription: {
      type: String,
      enum: [
        SUBSCRIPTION_TYPE.STARTER,
        SUBSCRIPTION_TYPE.PROFESSIONAL,
        SUBSCRIPTION_TYPE.BUSINESS,
      ],
      default: SUBSCRIPTION_TYPE.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
})

userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User