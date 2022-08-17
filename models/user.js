const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = Schema(
    {
        username: {
            type: String,
            unique: true,
        },

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

    },
    { versionKey: false, timestamps: true }
);

/* схема валідації реєстрації користувача (sign up) */

const registerSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
    subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .default('starter'),
});

/* схема валідації логіна користувача (log in) */

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});

/* валідація верифікація користувача */

const verifyResendEmailUser = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});

/* хешує і солить пароль перед збереженням до БД (hash password) */

userSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

/* порівнює паролі користувача при вході, якщо не збігаються, повертає null */

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const schemas = {
    register: registerSchema,
    login: loginSchema,
    verifyResendEmail: verifyResendEmailUser,
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas,
};