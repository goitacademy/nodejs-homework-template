const { Schema, model } = require('mongoose');
const Joi = require('joi');

const user = new Schema({
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
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
});

const schemaCreate = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const User = model('user', user);
  
module.exports = { User, schemaCreate};
