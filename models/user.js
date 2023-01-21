const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers')

const subscription = ['starter', 'pro', 'business'];

// const emailRegexp = new RegExp('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/')

const authSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    // match: emailRegexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscription,
    default: "starter"
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
  token: String,
});

authSchema.post("save", handleMongooseError);
  
const registerSchema = Joi.object({
  email: Joi.string().email()
    // .pattern(emailRegexp)
    .trim(),
  password: Joi.string().trim().min(6).required(),
  subscription: Joi.string().valid(...subscription),

});

const loginSchema = Joi.object({
  email: Joi.string().email().trim(),
  password: Joi.string().trim().min(6).required(),
}); 

const emailSchema = Joi.object({
  email: Joi.string().email().trim().required(),
}); 


const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscription).required(),
}); 

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  emailSchema,
}

const User = model('user', authSchema)

module.exports = {
  User,
  schemas,
}