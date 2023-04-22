const { Schema, model } = require('mongoose');
const Joi = require('joi');

const handleMongooseError = require('../helpers/handleMongooseError');

const emailRegexp =
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

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
            enum: ['starter', 'pro', 'business'],
            default: 'starter',
        },
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const validSubscriptionValues = ['starter', 'pro', 'business'];
const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid(...validSubscriptionValues)
        .required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
};

const User = model('user', userSchema);

module.exports = { User, schemas };
