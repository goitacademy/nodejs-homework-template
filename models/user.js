const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseErr } = require('../helpers');

const subscriptionsPlans = ['starter', 'pro', 'business'];
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 4,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegexp,
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
  { versionKey: false, timestamps: true,  }
);

const updateSchema = new Schema(
  {
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
  },
  { versionKey: false }
);

const registerSchema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  token: Joi.string(),
});

const updateSubscribtionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionsPlans)
    .required(),
});

const schemas = { registerSchema, loginSchema, updateSubscribtionSchema };

userSchema.post('save', handleMongooseErr);

const User = model('user', userSchema);

module.exports = { User, schemas };
