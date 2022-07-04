const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { randomUUID } = require('crypto');
const emailRegexp =
  /^[-!#$%&'*+/=?^_`{|}~A-Za-z0-9]+(?:\.[-!#$%&'*+/=?^_`{|}~A-Za-z0-9]+)*@([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]/;
const nameRegexp = /^[a-zA-Z. ']+$/;
const { Role } = require('../libs');
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      default: 'Guest',
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
      validate(value) {
        return emailRegexp.test(String(value).trim().toLowerCase());
      },
      unique: [true],
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
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true);
      },
      required: true,
    },
    idAvatarCloud: {
      type: String,
      default: null,
    },
    isVerification: {
      type: Boolean,
      default: false,
    },
    verificationTokenEmail: {
      type: String,
      required: [true, 'Verify token is required'],
      default: randomUUID(),
    },
    role: {
      type: String,
      enum: {
        values: Object.values(Role),
        message: 'Role is not allowed',
      },
      default: Role.USER,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const joiUserLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});
const joiUserSignUpSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).min(3).max(30).optional(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});
const joiUserVerifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const joiUserSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiUserLoginSchema,
  joiUserSignUpSchema,
  joiUserSubscriptionSchema,
  joiUserVerifyEmailSchema,
};
