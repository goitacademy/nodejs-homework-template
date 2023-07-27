const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            match: emailRegexp,
            unique: true,
            required: [true, 'Email is required'],
        },
        password: {
            type: String,
            minlength: 6,
            required: [true, 'Set password for user'],
        },
        
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter",
        },
        token: {
            type: String,
            default: ""
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
    }, {versionKey: false, timestamps: true}
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().required().valid("starter", "pro", "business"),
})

const schemas = {
    registerSchema,
    loginEmailSchema,
    loginSchema,
    updateSubscriptionSchema,
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas,
};