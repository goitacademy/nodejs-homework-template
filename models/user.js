const mongoose = require('mongoose');
const Joi = require('joi');

const schema = mongoose.Schema({
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
});

const User = mongoose.model('users', schema);

const joiRegisterSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
