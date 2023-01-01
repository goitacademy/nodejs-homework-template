const { Schema, model } = require('mongoose');
const gravatar = require('gravatar');

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const user = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarURL: {
      type: String,
      required: true,
      default: gravatar.url(this.email),
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
);

const Users = model('users', user);

module.exports = Users;
