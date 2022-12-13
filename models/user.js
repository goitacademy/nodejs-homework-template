const {Schema, model} = require('mongoose');
const Joi = require('joi');

const {handleSaveErrors} = require('../helpers');
const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = new Schema({
        email: {
            type: String,
            match: emailRegexp,
            unique: true,
            required: [true, 'Email is required'],
        },
        password: {
            type: String,
            minlength: 6,
            required: [true, 'Password is required'],
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter",
          },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
            required: true,
        },
        verify:{
            type: Boolean,
            default: false,
        },
        verificationToken:{
            type: String,
            required: [true, 'Verify token is required'],
        },
}, {versionKey: false, timestamps: true });

userSchema.post('save', handleSaveErrors);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const verifyEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    verifyEmailSchema,
}

const User = model('user', userSchema);

module.exports = {
    User,
    schemas
};