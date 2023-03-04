const { model, Schema } = require('mongoose');
const Joi = require('joi');

const emailRegex =
  /^(?!.*@.*@.*$)(?!.*@.*--.*\..*$)(?!.*@.*-\..*$)(?!.*@.*-$)((.*)?@.+(\..{1,11})?)$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegex,
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

const registerJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegex),
  password: Joi.string().required().min(6),
  subscription: Joi.string().valid('starter', 'pro', 'business').default('starter'),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegex),
  password: Joi.string().required().min(6),
});

const updateSubscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const User = model('user', userSchema);

module.exports = { User, registerJoiSchema, loginJoiSchema, updateSubscriptionJoiSchema };
