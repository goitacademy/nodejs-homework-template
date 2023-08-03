const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = {
  User,
  emailRegexp,
};
