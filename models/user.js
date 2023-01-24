const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
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
    avatarURL: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model('user', schema);

module.exports = {
  User,
};
