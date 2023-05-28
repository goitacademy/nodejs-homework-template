const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');
const subscriptionList = ['starter', 'pro', 'business'];
// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: 'starter',
    },
    avatarURL: String,
    token: String,
  },
  { versionKey: false, timestamps: true }
);

// const userSchemaLEKCIYA = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Set name for user'],
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       match: emailRegexp,
//     },
//     password: {
//       type: String,
//       minlength: 6,
//       required: true,
//     },

//     token: String,
//   },
//   { versionKey: false, timestamps: true }
// );

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required()
    .messages({
      'any.required': 'Subscription field is required',
      'string.empty': 'Subscription field cannot be empty',
      'any.only': 'Invalid subscription value',
    }),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model('user', userSchema);

module.exports = { User, schemas };
