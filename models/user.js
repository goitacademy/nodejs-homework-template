const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { mongooseHandleError } = require("../helpers");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, "Set password for user"],
    },
    email: {
        type: String,
        match: emailRegex,
        required: [true, "Email is required"],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: {
        type: String,
        default: "",
    },
}, { versionKey: false, timestamps: true });

userSchema.post("save", mongooseHandleError);

const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string(),
});

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};