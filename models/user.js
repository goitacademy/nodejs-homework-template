const { Schema, model } = require('mongoose');

const Joi = require('joi')

const { handleSaveErrors } = require('../helpers/Errors');
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for user'],
    },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: emailRegexp,
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
    avatarURL: {
        type: String,
        required: true,
    },
}
    , {
        versionKey: false,
        timestamps: true,
    },
);


userSchema.post("save", handleSaveErrors);
const User = model('user', userSchema);

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required',
    }),
    email: Joi.string().pattern(emailRegexp).required().messages({
        'string.email': 'Email should be valid',
        'string.empty': 'Email is required',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages(),
    subscription: Joi.string().optional()
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        'string.email': 'Email should be valid',
        'string.empty': 'Email is required',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password should have a minimum length of {#limit}',
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
    }),
})



const schemas = {
    registerSchema,
    loginSchema,
}

module.exports = {
    User,
    schemas,
}
