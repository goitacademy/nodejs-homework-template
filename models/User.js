const { Schema, model } = require('mongoose');
const handleSaveError = require('../helpers/hooks.js');
const Joi = require('joi');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
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
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  }
})

userSchema.post("save", handleSaveError);

const User = model("user", userSchema)

const userSignupSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
    subscription: Joi.string().required(),
});

const userSigninSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
});

const userEmailSchema = Joi.object({
    email: Joi.string().required(),
});

module.exports = {
  User,
  userSignupSchema,
  userSigninSchema,
  userEmailSchema
}