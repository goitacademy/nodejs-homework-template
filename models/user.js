const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const { emailRegex, SUBSCRIPTIONS_ENUM } = require('../constants');

const Joi = require('joi');

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: Object.values(SUBSCRIPTIONS_ENUM),
      default: SUBSCRIPTIONS_ENUM.STARTER,
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
