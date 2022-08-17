const { Schema, model } = require("mongoose");
const Joi = require('joi');

const userSchema = new Schema({
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
    refreshToken: {
        type: String,
        default: null,
    },
    role: [{
        type: String,
        required: [true, 'Role is required'],
        enum: ["ADMIN", "MODERATOR", "CUSTOMER", "EDITOR", "GUEST"],
    }],
    avatarURL: {
        type: String,
        required: true
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
}, { versionKey: false, timestamps: true });

const joiRegisterSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().default("starter").valid("starter", "pro", "business"),
    role: Joi.array().items(Joi.string().required().valid("ADMIN", "MODERATOR", "CUSTOMER", "EDITOR", "GUEST"))
});

const joiLoginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().required().valid("ADMIN", "MODERATOR", "CUSTOMER", "EDITOR", "GUEST")
});

const joiSubscriptionSchema = Joi.object({
    subscription: Joi.any().valid("starter", "pro", "business")
});

const joiCustomerSchema =  Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().default("starter").valid("starter", "pro", "business"),
    role: Joi.array().items(Joi.string().required().valid("ADMIN", "MODERATOR", "CUSTOMER", "EDITOR", "GUEST"))
});

const User = model("user", userSchema);

module.exports = {
    User, 
    joiRegisterSchema,
    joiLoginSchema,
    joiSubscriptionSchema,
    joiCustomerSchema
}
