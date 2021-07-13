require('dotenv').config()
const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
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
    avatarURL: {
      type: String,
      default: function () {
        const avatar = gravatar.url(this.email, { size: '250' }, true)
        console.log(avatar)
        return avatar
      },
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
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
