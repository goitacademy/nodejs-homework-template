const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveError } = require("../helpers");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const subscriptions = ["starter", "pro", "business"];

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, "Password is required"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: emailRegexp,
        },

        subscription: {
            type: String,
            enum: subscriptions,
            default: "starter",
        },

        token: {
            type: String,
            default: null,
        },

        avatarURL: {
            type: String,
            require: true,
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

const signup = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription: Joi.string(),
});

const signin = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
});

const subscription = Joi.object({
    subscription: Joi.string()
        .valid(...subscriptions)
        .required(),
});

const schemas = { signup, signin, subscription };

const User = model("user", userSchema);

module.exports = { User, schemas };
