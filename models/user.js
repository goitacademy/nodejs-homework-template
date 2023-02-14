const mongoose = require('mongoose');

// Schema

const schema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      //   match: [/[a-z0-9]+@[a-z0-9]+/, 'user email is not valid'],
    },
    password: {
      type: String,
      //   minLength: [6, 'password should be at least 6 characters long'],
      required: [true, 'Password is required'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: '',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact',
      },
    ],
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

// Schema -> model

const User = mongoose.model('user', schema);

module.exports = {
  User,
};
