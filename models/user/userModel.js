const mongoose = require('mongoose');
const Joi = require('joi');

const { EMAIL_REGEX } = require('../../utils/patterns');
const { handleMongooseError } = require('../../helpers');

const userSchemaJoi = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).pattern(EMAIL_REGEX).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid('starter', 'pro', 'business').default('starter'),
})

const userSchemaJoiLogin = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).pattern(EMAIL_REGEX).required(),
  password: Joi.string().min(6).required(),
})

const updateSubscriptionSchemaJoi = Joi.object({
  subscription: Joi.valid('starter', 'pro', 'business').required()
})

const verifyEmailSchemaJoi = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).pattern(EMAIL_REGEX).required(),
})

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name should be at least 3 characters long'],
    maxlength: [30, 'Name should not exceed 30 characters'],
    required: [true, 'Set name for user'],
  },
  password: {
    type: String,
    minlength: [6, 'Password should be at least 6 characters long'],
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    match: EMAIL_REGEX,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: ''
  },
  avatarURL: {
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
  },
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleMongooseError)

const User = mongoose.model('user', userSchema)

module.exports = {
  User,
  userSchemaJoi,
  userSchemaJoiLogin,
  updateSubscriptionSchemaJoi,
  verifyEmailSchemaJoi,
}