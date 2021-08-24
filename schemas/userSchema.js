const mongoose = require("mongoose")

const User = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  isActivated: {
    type: Boolean,
    default: 'false'
  },
  activationLink: {
    type: String,
  }
  // token: {
  //   type: String,
  //   default: null,
  // },
})

module.exports = mongoose.model('User', User)