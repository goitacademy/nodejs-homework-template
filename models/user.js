const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
      },
    ],
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String, // token: { type: String, default: null, },
    avatarURL: {
      type: String,
      default: '',
    },
    verify: {
      type: Boolean,
      // default: false,
    },
    verificationToken: {
      type: String,
      // required: [true, 'Verify token is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// Example
// schema.pre('save', async function () {
//   await doStuff();
//   await doMoreStuff();
// });

schema.pre('save', async function () {
  // console.log('pre save..., this', this);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
});

const User = mongoose.model('user', schema);

module.exports = {
  User,
};
