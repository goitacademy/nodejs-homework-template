const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schemaUser = new mongoose.Schema({
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
    default: 'starter',
  },
  avatarURL: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
})

schemaUser.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

const User = mongoose.model('User', schemaUser)

module.exports = {
  User,
}
