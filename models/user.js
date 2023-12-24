const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const userSchema = new Schema({
  password: {
    type: String,
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
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String

    }, { versionKey: false, timestamps: true });

    userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
    
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().optional(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
    
})

const User = model('user', userSchema);

const schemas = {
    registerSchema,
    loginSchema,
};

module.exports = {
    schemas,
    User,
};

