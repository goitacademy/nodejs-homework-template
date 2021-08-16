const { Schema, model } = require('mongoose')
const bcryptjs = require('bcryptjs')

const userSchema = new Schema({
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
})

userSchema.methods.setPassword = function (password) {
  this.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcryptjs.compareSync(password, this.password)
}

const User = model('users', userSchema)

module.exports = User
