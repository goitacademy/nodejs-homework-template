const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const usersSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'This email is in use'],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
})

usersSchema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

const Users = mongoose.model('Users', usersSchema)

module.exports = {
  Users
}