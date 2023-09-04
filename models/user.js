const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils');
const Joi = require('joi');

const registerSchema = Joi.object({});

const loginSchema = Joi.object({});

const schemas = {
  registerSchema,
  loginSchema,
};

const options = { versionKey: false, timestamps: true };

const mongooseSchema = {
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
};

const userSchema = new Schema(mongooseSchema, options);

const User = model('user', userSchema);

userSchema.post('save', handleMongooseError);

module.exports = { User, schemas };
