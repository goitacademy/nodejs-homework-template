const { Schema, model } = require("mongoose");

const userSchema = Schema({
    password: {
    type: String,
    required: [true, 'Set password for user'],
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
    required:true
  } ,
  token: {
    type: String,
    default: null
  }
}, { versionKey: false, timestamps: true })

const User = model('users', userSchema);

module.exports = User
