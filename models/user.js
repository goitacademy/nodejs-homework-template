const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
    },

    email: {
        type: String,
        required: [true, "Email is requiered!"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
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
}, {
    versionKey: false,
    timestamps: true,
});

const registerSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string()
        .valid("starter", "pro", "business")
        .default("starter"),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid("starter", "pro", "business")
        .default("starter")
        .required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };