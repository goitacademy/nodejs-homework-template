const {Schema, model} = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d].{8,30}$/;
const subscriptionTypes = ["starter", "pro", "business"];

const userSchema = new Schema({
    name: {
        type: String
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegex,
        unique: true,
    },
    subscription: {
        type: String,
        enum: subscriptionTypes,
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
    },
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(8).max(30).pattern(passwordRegex).required()
        .messages({
            "string.pattern.base":"Password should contain at least one uppercase letter, one lowercase letter, one number and one special character",
            "string.min":"Password shoud be at least 8 characters",
            "string.max":"Password shoul be less than 30 characters"
        }),
}, {
    versionKey: false,
    timestamps: true,
});

const loginSchema = Joi.object({
    password: Joi.string().min(8).required(),
    email: Joi.string().pattern(emailRegex).required().messages({
        "string.pattern.base":"You have misprint in your email"
    }),
}, {
    versionKey: false,
    timestamps: true,
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionTypes).required()
});

const User = model("user", userSchema);
const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema
};

module.exports = {
    User,
    schemas
};