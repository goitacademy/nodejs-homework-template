const { Schema, model } = require("mongoose");

const Joi = require("joi");

const joiSchema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required(),
    password: Joi.string().min(3).max(30).required(),
});

const joiSchemaSubscription = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business"),
   
});

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, "Set password for user"],
        },
        email: {
            type: String,
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
            default: null,
        },
        avatarURL: {
            type: String,
        },
    },
    { versionKey: null }
);
const User = model("user", userSchema);

module.exports = { User, joiSchema, joiSchemaSubscription };