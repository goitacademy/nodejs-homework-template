const { Schema, model } = require('mongoose');
const { passwordRegExp } = require('../helpers/regExp');
const emailRegExp = require('../helpers/regExp/email');
const bcrypt = require('bcrypt');
const userModel = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      // match: passwordRegExp,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      // match: emailRegExp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
userModel.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userModel.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const User = model('user', userModel);

module.exports = User;
