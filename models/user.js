const Joi = require('joi');
const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const emailRegexp = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/
const subscriptions = ["starter", "pro", "business"];

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  email: {
    type: String,
    match: emailRegexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscriptions,
    default: "starter"
  },
  avatarURL: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  }
}, {versionKey: false, timestamps: true});

userSchema.post('save', handleMongooseError)

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptions).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}