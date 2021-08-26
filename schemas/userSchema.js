const mongoose = require("mongoose")
const gravatar = require('gravatar');

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
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true);
    }
  },
  // token: {
  //   type: String,
  //   default: null,
  // },
})

module.exports = mongoose.model('User', User)