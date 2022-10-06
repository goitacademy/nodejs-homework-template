const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = Schema(
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
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: null,
        },
    }
);

userSchema.methods.hashPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.decodePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const joiSignUpSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
});

const joiSignInSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
});

const joiSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model('user', userSchema);

module.exports = {
    User,
    joiSignInSchema,
    joiSignUpSchema,
    joiSubscriptionSchema
}