const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
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
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .default('starter'),
});
 
const updateSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').allow(null),
});

const schemas = {
  schema,
  updateSchema,
};

const User = mongoose.model('user', userSchema);

module.exports = {
  User,
  schemas,
};