const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseErr } = require('../helpers');

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
  { versionKey: false, timestamps: true }
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

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required().messages({
//     'any.required': 'missing field {{#label}}',
//   }),
// });

const schemas = { userSchema, registerSchema, loginSchema };

userSchema.post('save', handleMongooseErr);

const Contact = model('user', userSchema);

module.exports = { Contact, schemas };
