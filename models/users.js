const Joi = require('joi');
const { Schema, model } = require('mongoose');
const { isIdValid } = require('../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const typesOfSubscriptions = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlength: 6,
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
    name: {
      type: String,
    },
    avatar: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    }
  },
  { versionKey: false, timeStamps: true }
);

userSchema.post("save", isIdValid)

const registerUser = Joi.object({
  name: Joi.string(),
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required().min(6),
});

const loginUser = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required().min(6),
});

const updateSubscription = Joi.object({
  subscription: Joi.string().valid(...typesOfSubscriptions),
});

const userSchemas = {
  registerUser,
  loginUser,
  updateSubscription,
};

const User = model('user', userSchema);

module.exports = {
  User,
  userSchemas,
};