const {Schema, model} = require('mongoose')

const userSchema = new Schema ({
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
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    avatarURL: {
      type: String,
      required: true
    },
    token: {
      type: String,
      default: null,
    },
}, {versionKey: false})

const User = model('user', userSchema)

module.exports = User