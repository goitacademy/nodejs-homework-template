const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require('../helpers');
const {emailPattern} = require("../pattern")

const subscriptionList = ['starter', 'pro', 'business']

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    email: {
        type: String,
        require: true,
        match: emailPattern,
        unique: [true, 'Email is required']
    },
    password: {
        type: String,
        minlength: 6,
        require: [true, 'Password is required']
    },
    subscription: {
        type: String,
        enum: subscriptionList,
        default: "starter",
        require: true
    },
    token: {
        type: String,
        default: ""
    },
    avatarUrl: {
        type: String,
        require: true
    }


}, { versionKey: false, timestamps: true })

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailPattern).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().valid(...subscriptionList)
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailPattern).required(),
    password: Joi.string().min(6).required()
})

const updateSubscriptionJoiSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionList)
})

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionJoiSchema
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}

