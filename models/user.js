const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = Schema(
    {
        username: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
        },

        email: {
            type: String,
            match: emailRegex,
            required: [true, 'Email is required'],
            unique: true,
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
    },
    { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string()
    .pattern(emailRegex)
    .required(),
    subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .required(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string()
    .pattern(emailRegex)
    .required(),
});

const schemas = {
    register: registerSchema,
    login: loginSchema,
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas,
};