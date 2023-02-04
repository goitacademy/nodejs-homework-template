const joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = require('mongoose');
const { mongooseErrorHandler } = require('@root/helpers');

const userScheme = new Schema(
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
  { versionKey: false, timestamps: true }
);
userScheme.post('save', mongooseErrorHandler);
userScheme.methods.addPassword = async password => {
  this.password = await bcrypt.hash(password, 10);
};
const UserModel = mongoose.model('users', userScheme);

const userJoiSchema = joi.object({
  password: joi.string().min(6).required(),
  email: joi.string().required(),
});

module.exports = {
  UserModel,
  userJoiSchema,
};
