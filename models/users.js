const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegex = /^[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+$/;
const SUBSCRIPTIONS = ['starter', 'pro', 'business'];

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegex,
        unique: true,
    },
    subscription: {
        type: String,
        enum: SUBSCRIPTIONS,
        default: "starter"
    },
    avatarURL: {
        type: String,
        required: [true, 'Please upload your avatar'],
    },
    token: {
        type: String,
        default: '',
    },
},
    { versionKey: false, timestamps: true });


userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).trim().required()
        .messages({ 'any.required': 'missing required "email" field' }),
    password: Joi.string().min(6).trim().max(20).required()
        .messages({ 'any.required': 'missing required "password" field' })
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required()
        .messages({ 'any.required': 'missing required "email" field' }),
    password: Joi.string().required()
        .messages({ 'any.required': 'missing required "password" field' })
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().required().lowercase().valid(...SUBSCRIPTIONS)
        .messages({ 'any.valid': `Choose one from provided subscriptions: [${SUBSCRIPTIONS.join(', ')}]` }),
});

const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema
}

const User = model('user', userSchema);
module.exports = {User, schemas}