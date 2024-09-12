const { Schema, model } = require('mongoose');
const gravatar = require('gravatar');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  avatarURL: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  },
});

const User = model('user', userSchema);

module.exports = User;
