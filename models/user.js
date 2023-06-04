const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const Joi = require('joi');

// const emailRegexp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        // match: emailRegexp
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minLength: [6, 'Password length 6(six) symbols minimum'],
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
    avatarURL: String,
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const updateUserSubcriptionSchema = Joi.object({
    subscription: Joi.string().trim().valid('starter', 'pro', 'business').required().messages({
        'any.required': 'subscription is required',
    })
})

const schemas = {
    registerSchema,
    loginSchema,
    updateUserSubcriptionSchema
}

const User = model('user', userSchema);

module.exports = {
    User,
    schemas
}