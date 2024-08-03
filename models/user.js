const mongoose = require('mongoose');
const gravatar = require('gravatar');
const Schema = mongoose.Schema;

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
    enum: ["starter", "pro", "business"],
    default: "starter"
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
    required: [true, 'Verify token is required'],
  },
});

userSchema.pre('save', function (next) {
  if (!this.avatarURL) {
    this.avatarURL = gravatar.url(this.email, { s: '200', r: 'pg', d: 'mm' });
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;