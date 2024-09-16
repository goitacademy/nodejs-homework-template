const { Schema, model } = require('mongoose');
const { passwordRegExp, emailRegExp } = require('../utils');

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: 6,
      match: passwordRegExp,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegExp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

module.exports = User;
