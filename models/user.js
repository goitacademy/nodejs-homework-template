const { Schema, model } = require('mongoose');

const joi = require('joi');

const { handleMongooseError } = require('../helpers');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for user'],
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
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
      default: '',
    },
  },
  { versionKey: false, timestamps: false }
);

userSchema.post('save', handleMongooseError);

const registerSchema = joi.object({
  name: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().required(),
  subscription: joi.string(),
});

const loginSchema = joi.object({
  password: joi.string().required(),
  email: joi.string().required(),
});

const schemas = { registerSchema, loginSchema };

const User = model('user', userSchema);

module.exports = { User, schemas };
