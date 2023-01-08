const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const Joi = require("joi");
const bcryptjs = require("bcryptjs");

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
    {
        name: {
            type: String,
            minLength: 3,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [emailRegExp, "Please fill a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter",
        },
        avatarURL: String,
        token: {
            type: String,
            default: null,
        },
        verificationToken: {
            type: String,
            require: [true, "Verify token is required"],
        },
        verify: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (pwd) {
    this.password = bcryptjs.hashSync(pwd, bcryptjs.genSaltSync(10));
};

userSchema.methods.comparePassword = function (pwd) {
    return bcryptjs.compareSync(pwd, this.password);
};

userSchema.post("save", handleSaveErrors);

const joiSingUpSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().pattern(emailRegExp).required().messages({
        "string.pattern.base": `Please fill a valid email address`,
    }),
    password: Joi.string().min(6).required(),
});

const joiSingInSchema = Joi.object({
    email: Joi.string().pattern(emailRegExp).required().messages({
        "string.pattern.base": `Please fill a valid email address`,
    }),
    password: Joi.string().min(6).required(),
});

const joiSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const joiVerifyEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegExp).required().messages({
        "string.pattern.base": `Please fill a valid email address`,
    }),
});

const joiUserSchemas = {
    joiSingUpSchema,
    joiSingInSchema,
    joiSubscriptionSchema,
    joiVerifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = { User, joiUserSchemas };
