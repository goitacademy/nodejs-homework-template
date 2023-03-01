const { Schema, model } = require('mongoose');
const emailRegExp = require('../helpers/regExp/email');
const bcrypt = require('bcrypt');
const { handleMongooseError } = require('../helpers');
const gravatar = require('gravatar');
const userModel = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegExp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarUrl: {
      type: String,
    },
    token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
userModel.post('save', handleMongooseError);

userModel.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userModel.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userModel.methods.createDefaultAvatar = function () {
  this.avatarUrl = gravatar.url(this.email, {
    s: '250',
    protocol: 'https',
    format: 'png',
  });
};
const User = model('user', userModel);

module.exports = User;
