require('dotenv').config()
const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const { SUBSCRIPTION, SALT_FACTOR } = require('../../helpers/contactsHelper')

const userSchema = new Schema(
  {
    email: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: [true, 'Email required'],
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 50,
      required: [true, 'Password required'],
    },
    subscription: {
      type: String,
      enum: {
        values: [SUBSCRIPTION.FREE, SUBSCRIPTION.PRO, SUBSCRIPTION.PREMIUM],
        message: `Invalid values. Allowed values: ${SUBSCRIPTION.values}`,
      },
      default: SUBSCRIPTION.default,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.path('email').validate(function (value) {
  const re = /\S+@\S+\.\S+/
  return re.test(String(value).toLowerCase())
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
