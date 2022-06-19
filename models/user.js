const { Schema, model } = require('mongoose');
const Joi = require('joi');
const emailRegexp =
  /^[-!#$%&'*+/=?^_`{|}~A-Za-z0-9]+(?:\.[-!#$%&'*+/=?^_`{|}~A-Za-z0-9]+)*@([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]/;
const nameRegexp = /^[a-zA-Z. ']+$/;
const bcrypt = require('bcryptjs');

const usersSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      unique: true,
      match: nameRegexp,
    },
    password: {
      type: String,
      minlength: 6,
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
  },
  { versionKey: false, timestamps: true },
);

usersSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

usersSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiUserLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});
const joiUserSignUpSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const joiUserSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});
const User = model('user', usersSchema);

module.exports = {
  User,
  joiUserLoginSchema,
  joiUserSignUpSchema,
  joiUserSubscriptionSchema,
};
