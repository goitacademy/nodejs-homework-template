require('dotenv').config()
const bcrypt = require('bcryptjs')
const { Schema, model } = require('mongoose')
const salt = process.env.SALT_WORK_FACTOR
const {
  Subscription: { FREE, PRO, PREMIUM },
  Owner: { USER },
} = require('../../helpers/constants')

const userSchema = new Schema(
  {
    email: String,
    password: String,
    subscription: {
      type: String,
      enum: [FREE, PRO, PREMIUM],
      default: FREE,
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

const User = model(USER, userSchema)

module.exports = User
