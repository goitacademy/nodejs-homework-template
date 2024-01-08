const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Enter your user name'],
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Set password for user'],
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
        default: "starter"
    },
    token: String
}, { versionKey: false });

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(emailRegex).required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const loginSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(emailRegex).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas,
}