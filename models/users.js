const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { verifyUserEmail } = require('../Users/verifyUserEmail');
const { String } = require('joi');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiration: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    tokenExpiration: {
      type: Date
    },

  },
  {
    timestamps: true,
  }
);

userSchema.methods.verifyUser = function (token, reqVerify) {
  this.verificationToken = null;
  this.isVerified = reqVerify;
  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = { User, verifyUserEmail };