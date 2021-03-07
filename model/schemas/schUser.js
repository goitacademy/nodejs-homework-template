const mongoose = require('mongoose')

const { Schema, model } = mongoose

const { UserStatus } = require('../../helpers/constants')

const userSchema = new Schema({
  email: String,
  password: String,
  subscription: {
    type: String,
    enum: [UserStatus.FREE, UserStatus.PRO, UserStatus.PREMIUM],
    default: UserStatus.FREE,
  },
  token: String,
})

const User = model('user', userSchema)

module.exports = User
