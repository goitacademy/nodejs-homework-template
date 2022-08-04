"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userSubscription_1 = require("./userSubscription");
const passwordSchema = joi_1.default.object({
    password: joi_1.default.string()
        .required()
        .error(() => new Error('Password is required'))
});
const validatePassword = (password) => passwordSchema.validate(password);
const emailSchema = joi_1.default.object({
    email: joi_1.default.string()
        .required()
        .error(() => new Error('Email is required'))
});
const validateEmail = (email) => emailSchema.validate(email);
const subscriptionSchema = joi_1.default.object({
    subscription: joi_1.default.string()
        .valid(...userSubscription_1.userSubscription)
        .default('starter')
});
const validateSubscription = (subscription) => subscriptionSchema.validate(subscription);
const tokenSchema = joi_1.default.object({
    token: joi_1.default.string()
        .default(null)
});
const validateToken = (token) => tokenSchema.validate(token);
const userSchema = joi_1.default.object()
    .concat(passwordSchema).required()
    .concat(emailSchema).required()
    .concat(subscriptionSchema)
    .concat(tokenSchema);
const validateUser = (user) => userSchema.validate(user);
const outerSchema = {
    validateEmail,
    validatePassword,
    validateSubscription,
    validateToken,
    validateUser
};
exports.default = outerSchema;
