const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const SALT_FACTOR = 6
const { Schema } = mongoose

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/
      return re.test(String(value).toLowerCase())
    },
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true)
    },
  },
  idCloudAvatar: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR),
  )
  next()
})

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User
