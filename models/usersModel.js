const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema(
  {
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
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  }
);

const User = mongoose.model('user', user);

module.exports = User;
