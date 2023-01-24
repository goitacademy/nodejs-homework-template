const mongoose = require('mongoose');

// Schema
const schema = mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minLength: [6, 'password should be at least 6 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/[a-z0-9]+@[a-z0-9]+/, 'user email is not valid'], // simple check
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact',
        required: [true, 'Contact id is required'],
        unique: true,
      },
    ],
    // contacts: {
    //   type: [mongoose.Types.ObjectId],
    //   rel: 'contact',
    // },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String, // token: { type: String, default: null, },
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
