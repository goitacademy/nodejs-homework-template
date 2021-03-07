const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const SALT_WORK_FACTOR = 8
const { Subscription, Owner } = require('../../helpers/constants')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set user Name'],
      minlength: 2,
      maxlength: 60,
      default: 'Default User',
    },
    email: {
      type: String,
      unique: true,
      require: [true, 'Set user Email'],
      validate(value) {
        const re = /\S+@\S+\.\S+/
        return re.test(String(value).toLowerCase())
      },
      default: 'example@email.com',
    },
    password: {
      type: String,
      require: [true, 'Set user Password'],
    },

    subscription: {
      type: String,
      require: [true, 'Set user Subscription type'],
      enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
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

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
  this.password = await bcrypt.hash(this.password, salt, null)
  next()
})

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model(Owner.USER, userSchema)

module.exports = User
