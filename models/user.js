const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userShema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },

    token: String,
  },
  { versioncey: false, timestamps: true }
);

userShema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(3).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(3).required(),
});

const schemas = { registerSchema, loginSchema };

const User = model('user', userShema);

module.exports = {
  User,
  schemas,
};
