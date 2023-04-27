const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError/handleMongooseError');

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().required().min(6),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().required().min(6),
});

const schemas = { registerSchema, loginSchema };

const userSchema = new Schema(
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

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = { User, schemas };
