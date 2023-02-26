const joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = require('mongoose');
const { mongooseErrorHandler } = require('../helpers');
const gravatar = require('gravatar');

const userScheme = new Schema(
  {
    hashedPassword: {
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
    avatarURL: { type: String, default: null },
  },
  {
    methods: {
      addPassword(password) {
        this.hashedPassword = bcrypt.hashSync(password, 10);
      },
      comparePasswords(password) {
        return bcrypt.compareSync(password, this.hashedPassword);
      },
      setAvatar(path = null) {
        const pathToImg = path ?? gravatar.url(this.email, { s: '250' });
        this.avatarURL = pathToImg;
      },
    },
    versionKey: false,
    timestamps: true,
  }
);
userScheme.post('save', mongooseErrorHandler);

const UserModel = mongoose.model('users', userScheme);

const userJoiSchema = joi.object({
  password: joi.string().min(6).required(),
  email: joi.string().required(),
});
const subscriptionJoiSchema = joi.object({
  subscription: joi.string().valid('starter', 'pro', 'business').required(),
});

module.exports = {
  UserModel,
  userJoiSchema,
  subscriptionJoiSchema,
};
