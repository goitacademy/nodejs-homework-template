const { Schema, model } = require('mongoose');
const { handleSaveErrors } = require('../helpers');

const Joi = require('joi');

const subscriptionList = ['starter', 'pro', 'business'];
const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = new Schema(
    {
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
            enum: subscriptionList,
            default: 'starter',
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid(...subscriptionList)
        .required(),
});

// Назвать аватар или автатар url
const updateAvatar = Joi.object({
    avatar: Joi.string().required,
});

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
    updateAvatar,
};

userSchema.post('save', handleSaveErrors);

const User = model('user', userSchema);

module.exports = { User, schemas };
