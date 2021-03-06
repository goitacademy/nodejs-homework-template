const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const salt = process.env.SALT_WORK_FACTOR
const { Subscription, Owner } = require('../../helpers/constants')

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: [true, 'Email require'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/
        return re.test(String(value).toLowerCase())
      },
    },
    password: {
      type: String,
      require: [true, 'Password require'],
    },

    subscription: {
      type: String,
      enum: {
        values: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
        message: 'unknown subscription type',
      },
      default: Subscription.FREE,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const doSalt = await bcrypt.genSalt(salt)
  this.password = await bcrypt.hash(this.password, doSalt, null)
})

userSchema.method.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model(Owner.USER, userSchema)

module.exports = User
