const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
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
    type: String
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required']
  },
  verify: {
    type: Boolean,
    default: false
  }
})

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10))
})

const UserModel = mongoose.model('users', userSchema)

module.exports = {
  UserModel
}
