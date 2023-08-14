const {Schema, model}= require('mongoose')
const Joi=require('joi')
const { handleMongooseError } = require('../helpers');

const emailRegexp=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema=Schema({
    password: {
        type: String,
        minLength: [5, 'Min length should be 5'],
        required: [true, 'Password is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        match:[emailRegexp, 'Enter correct email'],
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
} , {versionKey: false, timestamps: true})

userSchema.post('save', handleMongooseError)

const registerSchema=Joi.object({
    password:Joi.string().required().min(5).messages({
        'string.base': 'Password should be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password should have a minimum length of {#limit}',
        'any.required': 'Password is required',
    }),
    email:Joi.string().pattern(emailRegexp).required().messages({
        'string.base': 'Email should be a string',
        'string.empty': 'Email cannot be empty',
        'string.pattern.base':'Enter correct email',
        'any.required': 'Email is required',
      }),
      subscription:Joi.string().valid('starter', 'pro', "business").messages({
        'string.base': 'Subscription should be a string',
        'any.only': 'Invalid subscription type. Valid options: starter, pro, business'
      })
})

const loginSchema=Joi.object({
    password:Joi.string().required().min(5).messages({
        'string.base': 'Password should be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password should have a minimum length of {#limit}',
        'any.required': 'Password is required',
    }),
    email:Joi.string().pattern(emailRegexp).required().messages({
        'string.base': 'Email should be a string',
        'string.empty': 'Email cannot be empty',
        'string.pattern.base':'Enter correct email',
        'any.required': 'Email is required',
      }),
})

const updateSubscriptionSchema=Joi.object({
  subscription:Joi.string().valid('starter', 'pro', "business").required().messages({
    'string.base': 'Subscription should be a string',
    'any.only': 'Invalid subscription type. Valid options: starter, pro, business',
    'any.required': 'Subscription is required',
  })
})

const schemas={
    registerSchema,
    loginSchema,
    updateSubscriptionSchema
}

const User=model('user', userSchema)

module.exports={
    User,
    schemas
}