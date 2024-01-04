const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const subscriptionList = ['starter', 'pro', 'business'];

const userSchema = new Schema(
    {
        password: {
            type: String,
            minlength: 6,
            required: [true, 'Set password for user'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: emailRegex,
            unique: true,
        },
        subscription: {
            type: String,
            enum: subscriptionList,
            default: 'starter',
        },
        token: {
            type: String,
            default: '',
        },
        avatarURL: {
            type: String,
            required: [true, 'Avatar is required'],
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegex).required(),
    subscription: Joi.string().valid(...subscriptionList),
});

const verifyEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegex).required(),
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid(...subscriptionList)
        .required(),
});

const schemas = {
    registerSchema,
    verifyEmailSchema,
    loginSchema,
    updateSubscriptionSchema,
};

module.exports = { User, schemas };
