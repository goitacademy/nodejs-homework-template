const {Schema, model} = require('mongoose');

const Joi = require("joi");

const userSchema = new Schema({

    password: {
        type: String,
        required: [true, 'Password is required'],
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
        default: null,
      },

},{versionKey: false})

const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().required(),
  
  })

  const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    

  
  })

  const schemas = {
    registerSchema,
    loginSchema,
  }

  const User = model('user', userSchema);


  module.exports  = { 
    User,
    schemas,
  }