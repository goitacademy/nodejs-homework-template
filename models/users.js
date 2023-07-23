const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = Schema(
    {
        password: {
            type: String,
            required: [true, 'Set password for user']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ['starter', 'pro', 'business'],
            defaul: 'starter',
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

const joiAuthSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
});

const User = model('User', userSchema);

module.exports = { User, joiAuthSchema };