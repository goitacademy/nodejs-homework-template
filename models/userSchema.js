const mongoose = require('mongoose')
const bCrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
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
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
   avatarURL: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
},);

userSchema.methods.setPassword = async function (password) {
  this.password = await bCrypt.hash(password, 10)
}

userSchema.methods.validatePassword = async function (password) {
    return await bCrypt.compare(password, this.password);
}

userSchema.methods.setToken = async function (token) {
  this.token = token;
}

userSchema.methods.setAvatar = async function (avatarURL) {
    this.avatarURL = avatarURL;
  }
    
const User = mongoose.model('User', userSchema);

module.exports = User;