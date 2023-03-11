const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require('../helpers');
const {emailPattern} = require("../pattern")

const subscriptionList = ['starter', 'pro', 'business']

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        match: emailPattern,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        require: true,
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

const schemas = {
    registerSchema,
    loginSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}

