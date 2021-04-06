const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    subscription: {
      type: String,
      enum: ['free', 'pro', 'premium'],
      default: 'free',
    },
    avatarURL: String,
    token: String,
  },
  { versionKey: false }
)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(6))
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
